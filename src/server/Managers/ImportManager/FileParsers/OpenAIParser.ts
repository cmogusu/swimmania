import { EventEmitter } from "node:stream";
import OpenAI from "openai";
import type { Stream } from "openai/core/streaming.mjs";
import { chain } from "stream-chain";
import { parser } from "stream-json";
import { streamValues } from "stream-json/streamers/StreamValues.js";
import {
	type UnprocessedSwimResultsManager,
	unprocessedSwimResultsManagerFactory,
} from "@/server/Managers/UnprocessedSwimResultsManager";
import { Log } from "@/server/services";
import { getSwimEvent } from "./functionSchema";
import { getSwimMeet } from "./functionSchema/getSwimMeet";

export class OpenAIParser extends EventEmitter {
	static EVENTS = {
		EVENT_DATA: "EVENT",
		MEET_DATA: "MEET",
	};

	client: OpenAI;
	swimResultManager: UnprocessedSwimResultsManager;
	log: Log;
	model: string = "gpt-4.1";

	constructor() {
		super();
		this.swimResultManager = unprocessedSwimResultsManagerFactory.getInstance();
		this.client = this.getClient();
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

	getPipeline(eventName: string) {
		const pipeline = chain([
			parser({ jsonStreaming: true, streamKeys: true }),
			streamValues(),
		]);

		pipeline.on("data", (result) => {
			this.emit(eventName, result.value);
		});

		return pipeline;
	}

	async handleResponseStream(
		responseStream: Stream<OpenAI.ChatCompletionChunk>,
		eventName: string,
	) {
		const pipeline = this.getPipeline(eventName);
		for await (const event of responseStream) {
			const firstToolCallArgs =
				event.choices[0]?.delta.tool_calls?.[0]?.function?.arguments;

			if (firstToolCallArgs) {
				pipeline.write(firstToolCallArgs);
			}

			const usage = event.usage;
			if (usage) {
				this.log.appLogic(
					`totalTokens: ${usage.total_tokens}, promptTokens: ${usage.prompt_tokens}, completionTokens: ${usage.completion_tokens}`,
				);
			}
		}
	}

	async fetch(
		options: OpenAI.ChatCompletionCreateParamsStreaming,
		emitterEvent: string,
	) {
		const responseStream = await this.client.chat.completions
			.create(options)
			.catch((e) => this.log.error("Unable to parse data using GPT", e));

		if (responseStream) {
			await this.handleResponseStream(responseStream, emitterEvent);
		}
	}

	async fetchSwimMeet(text: string) {
		await this.fetch(
			{
				model: this.model,
				stream: true,
				messages: [
					{
						role: "user",
						content: `Extract information about the swim meet from this text. ${text}`,
					},
					{
						role: "system",
						content: "Extract swim meet from the provided text.",
					},
				],
				tools: [
					{
						type: "function",
						function: getSwimMeet,
					},
				],
				tool_choice: {
					type: "function",
					function: { name: "get_swim_meet" },
				},
			},
			OpenAIParser.EVENTS.MEET_DATA,
		);
	}

	async fetchSwimEvents(text: string) {
		await this.fetch(
			{
				model: this.model,
				stream: true,
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
						function: getSwimEvent,
					},
				],
				tool_choice: {
					type: "function",
					function: { name: "get_swim_event" },
				},
			},
			OpenAIParser.EVENTS.EVENT_DATA,
		);
	}
}
