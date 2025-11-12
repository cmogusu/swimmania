import OpenAI from "openai";
import { OpenAIParser } from "./OpenAIParser";

export class DeepSeekParser extends OpenAIParser {
	model: string = "deepseek-chat";

	getClient() {
		const { DEEPSEEK_API_KEY: apiKey } = process.env;
		if (!apiKey) {
			throw Error("OpenAI api key not set");
		}

		return new OpenAI({
			apiKey,
			baseURL: "https://api.deepseek.com/v1",
		});
	}
}
