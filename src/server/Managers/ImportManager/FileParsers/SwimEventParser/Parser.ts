import { DeepSeekParser } from "../DeepSeekParser";
import type { RawSwimMeet } from "../types";
import { functionSchema } from "./functionSchema";

export class SwimEventParser extends DeepSeekParser {
	async fetch(text: string) {
		await this._fetch({
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
					function: functionSchema,
				},
			],
			tool_choice: {
				type: "function",
				function: { name: "get_swim_event" },
			},
		});
	}

	emitData(value: unknown) {
		this.emit("data", value as RawSwimMeet);
	}
}
