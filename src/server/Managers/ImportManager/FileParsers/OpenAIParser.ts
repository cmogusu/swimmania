import { EventEmitter } from "node:stream";
import OpenAI from "openai";
import { type ChainOutput, chain } from "stream-chain";
import { parser } from "stream-json";
import { streamValues } from "stream-json/streamers/StreamValues.js";
import {
	type RawSwimResult,
	type UnprocessedSwimResultsManager,
	unprocessedSwimResultsManagerFactory,
} from "@/server/Managers/UnprocessedSwimResultsManager";
import { Log } from "@/server/services";
import { getSwimResultsWithSchema } from "./schema";
import type { RawSwimEvent } from "./types";

export class OpenAIParser extends EventEmitter {
	client: OpenAI;
	pipeline: ChainOutput<unknown, RawSwimEvent>;
	swimResultManager: UnprocessedSwimResultsManager;
	log: Log;
	model: string = "gpt-4.1";

	constructor() {
		super();
		this.swimResultManager = unprocessedSwimResultsManagerFactory.getInstance();
		this.client = this.getClient();
		this.pipeline = this.getPipeline();
		this.log = new Log();
	}

	getClient() {
		const { OPENAI_API_KEY: apiKey } = process.env;
		if (!apiKey) {
			throw Error("OpenAI api key not set");
		}

		return new OpenAI({
			apiKey,
		});
	}

	getPipeline() {
		const pipeline = chain([
			parser({ jsonStreaming: true, streamKeys: true }),
			streamValues(),
		]);

		pipeline.on("data", (result) => {
			this.emit("swimEventData", result.value as RawSwimResult);
		});

		return pipeline;
	}

	async fetchSwimEventsAndResults(text: string) {
		const responseStream = await this.client.chat.completions
			.create({
				model: this.model,
				messages: [
					{
						role: "user",
						content: `Extract swim results from this text. ${text}`,
					},
					{
						role: "system",
						content: "Extract swim results as JSON from the provided text.",
					},
				],
				tools: [
					{
						type: "function",
						function: getSwimResultsWithSchema,
					},
				],
				tool_choice: {
					type: "function",
					function: { name: "get_swim_results" },
				},
				stream: true,
			})
			.catch((e) => console.log(e.Error, e));

		if (!responseStream) {
			return;
		}

		for await (const event of responseStream) {
			const firstToolCallArgs =
				event.choices[0]?.delta.tool_calls?.[0]?.function?.arguments;

			if (firstToolCallArgs) {
				this.pipeline.write(firstToolCallArgs);
			}

			const usage = event.usage;
			if (usage) {
				this.log.appLogic(
					`totalTokens: ${usage.total_tokens}, promptTokens: ${usage.prompt_tokens}, completionTokens: ${usage.completion_tokens}`,
				);
			}
		}
	}

	[Symbol.dispose]() {
		this.pipeline.end();
	}
}
