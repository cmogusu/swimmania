import z from "zod";
import { BaseValidate } from "@/server/Managers/services/BaseValidate";

export class Validate extends BaseValidate {
	textValidator = z.string();

	text(v: string) {
		this.textValidator.parse(v);
	}

	minMaxNumber(min: number, max: number, num?: unknown): number {
		return z.coerce
			.number()
			.min(min, "Too small")
			.max(max, "Too large")
			.parse(num);
	}
}

export const ValidateInstance = new Validate();
