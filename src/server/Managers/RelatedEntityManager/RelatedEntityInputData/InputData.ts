import type { RawRelatedEntityInputData, RelationshipType } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class RelatedEntityInputData {
	readonly entityType: string;
	readonly entityId: number;
	readonly relatedEntityType: string;
	readonly relatedEntityId?: number;
	readonly relationshipType?: RelationshipType;
	limit: number = 10;
	offset: number = 0;

	validate: Validate;
	sanitize: Sanitize;

	constructor({
		entityType,
		entityId,
		relatedEntityType,
		relatedEntityId,
		relationshipType,
	}: RawRelatedEntityInputData) {
		this.entityType = entityType;
		this.entityId = entityId;
		this.relatedEntityType = relatedEntityType;
		this.relationshipType = relationshipType;

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
			relationshipType: this.relationshipType,
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
