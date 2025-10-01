import type { RawDeleteAllRelatedInputData } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteAllInputData {
	readonly entityId: number;

	validate: Validate;

	constructor({ entityId }: RawDeleteAllRelatedInputData) {
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
