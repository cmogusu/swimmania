import type { EntityType } from "@/server/types";
import type { RawGetByIdMetadataInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByIdInputData {
	id: number;
	entityId: number;
	entityType: EntityType;

	validate: Validate;
	sanitize: Sanitize;

	constructor({ id, entityId, entityType }: RawGetByIdMetadataInputs) {
		this.id = id;
		this.entityId = entityId;
		this.entityType = entityType;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		this.validate.id(this.id);
		this.validate.id(this.entityId);
		this.validate.entityType(this.entityType);
	}

	getSanitized() {
		return {
			id: this.sanitize.id(this.id),
			entityId: this.sanitize.id(this.entityId),
			entityType: this.entityType,
		};
	}
}
