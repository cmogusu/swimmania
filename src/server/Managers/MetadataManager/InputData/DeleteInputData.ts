import type { EntityType } from "@/server/types";
import type { RawDeleteMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteInputData {
	id: number;
	entityId: number;
	entityType: EntityType;
	validate: Validate;

	constructor({ id, entityId, entityType }: RawDeleteMetadataInputs) {
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
