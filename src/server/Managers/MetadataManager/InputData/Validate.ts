import z from "zod";
import { BaseValidate } from "../../services/BaseValidate";

export class Validate extends BaseValidate {
	filterValidator = z.array(
		z.object({
			name: this.nameValidator,
			comparator: this.stringValidator,
		}),
	);

	filters(f: unknown) {
		return this.filterValidator.parse(f);
	}
}

export const ValidateInstance = new Validate();
