import type { EntityType } from "@/server/types";
import type { RawGrantAccessInputs } from "../type";
import { type Validate, ValidateInstance } from "./Validate";

export class GrantAccessInputData {
	entityType: EntityType;
	userId: string;
	entityId: number;
	validate: Validate;

	constructor({ entityType, userId, entityId }: RawGrantAccessInputs) {
		this.entityType = entityType;
		this.userId = userId;
		this.entityId = entityId;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
		this.userId = this.validate.stringId(this.userId);
		this.entityType = this.validate.entityType(this.entityType);
	}
}
