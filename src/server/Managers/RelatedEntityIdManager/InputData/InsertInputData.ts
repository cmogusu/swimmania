import type { EntityType, RelationshipType } from "@/server/types";
import type { RawInsertRelatedInputData } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	readonly entityType: EntityType;
	readonly entityId: number;
	readonly relatedEntityType: EntityType;
	readonly relatedEntityId: number;
	readonly relationshipType: RelationshipType;

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
		this.validate.entityType(this.entityType);
		this.validate.id(this.entityId);
		this.validate.entityType(this.relatedEntityType);
		this.validate.id(this.relatedEntityId);
		this.validate.relationshipType(this.relationshipType);
	}

	getSanitized() {
		const { sanitize } = this;

		return {
			entityType: sanitize.entityType(this.entityType),
			entityId: sanitize.id(this.entityId),
			relatedEntityType: sanitize.entityType(this.relatedEntityType),
			relatedEntityId: sanitize.id(this.relatedEntityId),
			relationshipType: sanitize.relationshipType(
				this.relationshipType,
			) as RelationshipType,
		};
	}
}
