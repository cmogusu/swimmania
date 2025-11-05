import type { EntityType } from "@/server/types";
import type { RawGetByIdMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByIdInputData {
	id: number;
	entityId: number;
	entityType: EntityType;

	validate: Validate;

	constructor({ id, entityId, entityType }: RawGetByIdMetadataInputs) {
		this.id = id;
		this.entityId = entityId;
		this.entityType = entityType;

		this.validate = ValidateInstance;
	}

	validateData() {
		this.id = this.validate.id(this.id);
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.entityType);
	}
}
