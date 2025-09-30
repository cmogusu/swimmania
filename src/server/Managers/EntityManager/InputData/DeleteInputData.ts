import type { RawDeleteEntityInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteInputData {
	entityId: number;
	validate: Validate;

	constructor({ entityId }: RawDeleteEntityInputs) {
		this.entityId = entityId;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.validate.id(this.entityId);
	}

	getSanitized() {
		return {
			entityId: this.entityId,
		};
	}
}
