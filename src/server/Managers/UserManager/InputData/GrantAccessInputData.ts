import type { EntityType } from "@/server/types";
import type { RawGrantAccessInputs } from "../type";
import { type Validate, ValidateInstance } from "./Validate";

export class GrantAccessInputData {
	entityType: EntityType;
	entityId: number;
	validate: Validate;

	constructor({ entityType, entityId }: RawGrantAccessInputs) {
		this.entityType = entityType;
		this.entityId = entityId;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.entityType);
	}
}
