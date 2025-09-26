import fs from "fs";
import OpenAI from "openai";
import { type ChainOutput, chain } from "stream-chain";
import { parser } from "stream-json";
import { pick } from "stream-json/filters/Pick.js";
import { streamArray } from "stream-json/streamers/StreamArray.js";
import {
	type RawSwimResult,
	type UnprocessedSwimResultsManager,
	unprocessedSwimResultsManagerFactory,
} from "@/server/Managers/UnprocessedSwimResultsManager";
import { systemMessage, userMessage } from "./gptParams";
import { getSwimResultsWithSchema, openAiJsonSchema } from "./schema";

export class OpenAIParser {
	client: OpenAI;
	pipeline: ChainOutput;
	swimResultManager: UnprocessedSwimResultsManager;
	model: string = "gpt-4.1";

	constructor() {
		this.swimResultManager = unprocessedSwimResultsManagerFactory.getInstance();
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
		const pipeline = chain([
			parser(),
			pick({ filter: "events" }),
			streamArray(),
		]);

		pipeline.on("data", ({ value: swmResult }: { value: RawSwimResult }) => {
			console.log(swmResult);
			this.swimResultManager.insert(swmResult);
		});

		return pipeline;
	}

	async fetch(text: string) {
		const responseStream = await this.client.chat.completions.create({
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
		});

		for await (const event of responseStream) {
			if (event.type === "message.delta" && event.delta?.content) {
				const chunk = event.delta.content[0].text || "";
				this.pipeline.write(chunk);
			} else if (event.type === "message.completed") {
				this.pipeline.end();
			}
		}
	}

	[Symbol.dispose]() {
		this.pipeline.end();
	}
}
