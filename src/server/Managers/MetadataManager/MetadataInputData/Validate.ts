import z from "zod";
import { BaseValidate } from "../../services/BaseValidate";

export class Validate extends BaseValidate {
	itemIndexValidator = z.nullable(z.number().positive().max(10));

	itemIndex(v?: unknown) {
		this.itemIndexValidator.parse(v);
	}
}

export const ValidateInstance = new Validate();
