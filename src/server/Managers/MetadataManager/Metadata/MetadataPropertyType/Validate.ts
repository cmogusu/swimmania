import z from "zod";
import { BaseValidate } from "@/server/Managers/services/BaseValidate";

export class Validate extends BaseValidate {
	textValidator = z.string();

	text(v: string) {
		this.textValidator.parse(v);
	}
}

export const ValidateInstance = new Validate();
