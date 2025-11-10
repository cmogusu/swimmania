import type { EntityType } from "@/server/types";
import type { RawDeleteEntityInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteInputData {
	entityType: EntityType;
	entityId: number;
	validate: Validate;

	constructor({ entityId, entityType }: RawDeleteEntityInputs) {
		this.entityId = entityId;
		this.entityType = entityType;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.entityType);
	}
}
