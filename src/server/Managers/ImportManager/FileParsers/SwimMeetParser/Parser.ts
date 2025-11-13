import { DeepSeekParser } from "../DeepSeekParser";
import type { RawSwimEvent } from "../types";
import { functionSchema } from "./functionSchema";

export class SwimMeetParser extends DeepSeekParser {
	async fetch(text: string) {
		await this._fetch({
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
					function: functionSchema,
				},
			],
			tool_choice: {
				type: "function",
				function: { name: "get_swim_meet" },
			},
		});
	}

	emitData(value: unknown) {
		this.emit("data", value as RawSwimEvent);
	}
}
