import type { RawRelatedEntityInputData } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class RelatedEntityInputData {
	readonly entityType: string;
	readonly entityId: number;
	readonly relatedEntityType: string;
	readonly relatedEntityId?: number;
	limit: number = 10;
	offset: number = 0;

	validate: Validate;
	sanitize: Sanitize;

	constructor({
		entityType,
		entityId,
		relatedEntityType,
		relatedEntityId,
	}: RawRelatedEntityInputData) {
		this.entityType = entityType;
		this.entityId = entityId;
		this.relatedEntityType = relatedEntityType;

		if (relatedEntityId) this.relatedEntityId = relatedEntityId;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	toJSON() {
		return {
			entityType: this.entityType,
			entityId: this.entityId,
			relatedEntityType: this.relatedEntityType,
			relatedEntityId: this.relatedEntityId,
			limit: this.limit,
			offset: this.offset,
		};
	}

	validateGetAllData() {
		this.validate.entityType(this.entityType);
		this.validate.id(this.entityId);
		this.validate.entityType(this.relatedEntityType);
	}

	validateInsertData() {
		this.validate.id(this.relatedEntityId);
		this.validateGetAllData();
	}

	validateDeleteData() {
		this.validateInsertData();
	}
}
