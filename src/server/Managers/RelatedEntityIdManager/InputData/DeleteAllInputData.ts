import type { EntityType } from "@/server/types";
import type { RawDeleteAllRelatedInputData } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteAllInputData {
	entityType: EntityType;
	entityId: number | string;
	relatedEntityType: EntityType;
	validate: Validate;

	constructor({
		entityType,
		entityId,
		relatedEntityType,
	}: RawDeleteAllRelatedInputData) {
		this.entityType = entityType;
		this.entityId = entityId;
		this.relatedEntityType = relatedEntityType;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.relatedEntityType);
	}
}
