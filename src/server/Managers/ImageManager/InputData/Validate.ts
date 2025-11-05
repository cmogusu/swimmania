import z from "zod";
import { BaseValidate } from "../../services/BaseValidate";

export class Validate extends BaseValidate {
	filepathValidator = z.string().min(1).max(255);

	filepath(filepath: string) {
		return this.filepathValidator.parse(filepath);
	}
}

export const ValidateInstance = new Validate();
