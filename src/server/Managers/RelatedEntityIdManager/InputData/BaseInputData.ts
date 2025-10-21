import type { EntityType, RelationshipType } from "@/server/types";
import type { RawInsertRelatedInputData } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class BaseInputData {
	entityType: EntityType;
	entityId: number;
	relatedEntityType: EntityType;
	relatedEntityId: number;
	relationshipType: RelationshipType;

	validate: Validate;
	sanitize: Sanitize;

	constructor({
		entityType,
		entityId,
		relatedEntityType,
		relatedEntityId,
		relationshipType,
	}: RawInsertRelatedInputData) {
		this.entityType = entityType;
		this.entityId = entityId;
		this.relatedEntityType = relatedEntityType;
		this.relatedEntityId = relatedEntityId;
		this.relationshipType = relationshipType;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.entityId = this.validate.id(this.entityId);
		this.relatedEntityType = this.validate.entityType(this.relatedEntityType);
		this.relatedEntityId = this.validate.id(this.relatedEntityId);
		this.validate.relationshipType(
			this.entityType,
			this.relatedEntityType,
			this.relationshipType,
		);
	}

	getSanitized() {
		return {
			entityType: this.entityType,
			entityId: this.entityId,
			relatedEntityType: this.relatedEntityType,
			relatedEntityId: this.relatedEntityId,
			relationshipType: this.sanitize.relationshipType(
				this.relationshipType,
			) as RelationshipType,
		};
	}
}
