import { EVENT } from "@/server/constants";
import type { RawSwimEvent } from "../../types";
import { DeepSeekParser } from "../DeepSeekParser";
import { functionSchema } from "./functionSchema";

export class SwimMeetParser extends DeepSeekParser {
	async parse(text: string) {
		await this.fetch({
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
		this.emit(EVENT.DATA, value as RawSwimEvent);
	}
}
