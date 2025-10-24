import type { EntityType } from "@/server/types";
import type { RawDeleteMetadataInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteInputData {
	id: number;
	entityId: number;
	entityType: EntityType;

	validate: Validate;
	sanitize: Sanitize;

	constructor({ id, entityId, entityType }: RawDeleteMetadataInputs) {
		this.id = id;
		this.entityId = entityId;
		this.entityType = entityType;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		this.validate.id(this.id);
		this.validate.id(this.entityId);
	}

	getSanitized() {
		return {
			entityType: this.entityType,
			id: this.sanitize.id(this.id),
			entityId: this.sanitize.id(this.entityId),
		};
	}
}
