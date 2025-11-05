import type { RawDeleteAllRelatedInputData } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteAllInputData {
	entityId: number;
	validate: Validate;

	constructor({ entityId }: RawDeleteAllRelatedInputData) {
		this.entityId = entityId;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
	}

	getSanitized() {
		return {
			entityId: this.entityId,
		};
	}
}
