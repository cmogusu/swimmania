import type { EntityType } from "@/server/types";
import type { RawDeleteAllMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteAllInputData {
	entityId: number;
	entityType: EntityType;
	validate: Validate;

	constructor({ entityId, entityType }: RawDeleteAllMetadataInputs) {
		this.entityId = entityId;
		this.entityType = entityType;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.entityType);
	}
}
