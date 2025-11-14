import { EventEmitter } from "node:stream";
import OpenAI from "openai";
import { type ChainOutput, chain } from "stream-chain";
import { parser } from "stream-json";
import { streamValues } from "stream-json/streamers/StreamValues.js";
import { EVENT } from "@/server/constants";
import { Log } from "@/server/services";
import type { ITextParser } from "../types";

export class OpenAIParser extends EventEmitter implements ITextParser {
	client: OpenAI;
	log: Log;
	model: string = "gpt-4.1";
	pipeline: ChainOutput<string, unknown>;

	constructor() {
		super();

		this.log = new Log();
		this.client = this.getClient();
		this.pipeline = this.getPipeline();
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
		const pipeline = chain([parser({ jsonStreaming: true }), streamValues()]);

		pipeline.on("data", (result) => {
			this.emitData(result.value);
		});

		return pipeline;
	}

	emitData(value: unknown) {
		this.emit(EVENT.DATA, value);
	}

	parse(_text: string) {
		throw Error("Not implemented");
	}

	async fetch(options: OpenAI.ChatCompletionCreateParamsStreaming) {
		const responseStream = await this.client.chat.completions.create(options);

		for await (const event of responseStream) {
			const firstToolCallArgs =
				event.choices[0]?.delta.tool_calls?.[0]?.function?.arguments;

			if (firstToolCallArgs) {
				this.pipeline.write(firstToolCallArgs);
			}

			const usage = event.usage;
			if (usage) {
				this.pipeline.end();
				this.log.appLogic(
					`totalTokens: ${usage.total_tokens}, promptTokens: ${usage.prompt_tokens}, completionTokens: ${usage.completion_tokens}`,
				);
			}
		}
	}

	[Symbol.dispose]() {
		this.pipeline.destroy();
	}
}
