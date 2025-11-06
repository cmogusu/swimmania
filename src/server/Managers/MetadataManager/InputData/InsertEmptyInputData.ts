import type { EntityType } from "@/server/types";
import type { RawInsertEmptyMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertEmptyInputData {
	entityId: number;
	entityType: EntityType;
	validate: Validate;

	constructor(rawInputs: RawInsertEmptyMetadataInputs) {
		const { entityType, entityId } = rawInputs;
		this.entityId = entityId;
		this.entityType = entityType;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.entityId = this.validate.id(this.entityId);
	}
}
