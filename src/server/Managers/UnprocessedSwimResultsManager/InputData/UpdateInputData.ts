import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import type { RawUpdateSwmResultInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class UpdateInputData extends BaseInputData {
	id: number;
	validate: Validate;

	constructor({ id }: RawUpdateSwmResultInputs) {
		super();

		this.id = id;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.validate.id(this.id);
	}

	getSanitized() {
		return {
			id: this.id,
		};
	}
}
