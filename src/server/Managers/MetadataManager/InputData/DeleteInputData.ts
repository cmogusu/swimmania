import type { EntityType } from "@/server/types";
import type { RawDeleteMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteInputData {
	entityId: number;
	entityType: EntityType;
	validate: Validate;

	constructor({ entityId, entityType }: RawDeleteMetadataInputs) {
		this.entityId = entityId;
		this.entityType = entityType;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.entityType);
	}
}
