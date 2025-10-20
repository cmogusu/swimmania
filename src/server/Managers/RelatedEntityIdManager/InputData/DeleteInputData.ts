import type { EntityType, RelationshipType } from "@/server/types";
import type { RawDeleteByIdRelatedInputData } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class DeleteInputData {
	readonly entityType: EntityType;
	readonly entityId: number;
	readonly relatedEntityType: EntityType;
	readonly relatedEntityId: number;
	readonly relationshipType?: RelationshipType;

	validate: Validate;

	constructor({
		entityType,
		entityId,
		relatedEntityType,
		relatedEntityId,
		relationshipType,
	}: RawDeleteByIdRelatedInputData) {
		this.entityType = entityType;
		this.entityId = entityId;
		this.relatedEntityType = relatedEntityType;
		this.relatedEntityId = relatedEntityId;
		this.relationshipType = relationshipType;

		this.validate = ValidateInstance;
	}

	validateData() {
		this.validate.entityType(this.entityType);
		this.validate.id(this.entityId);
		this.validate.entityType(this.relatedEntityType);
		this.validate.id(this.relatedEntityId);
		this.validate.relationshipType(this.relationshipType);
	}

	getSanitized() {
		return {
			entityType: this.entityType,
			entityId: this.entityId,
			relatedEntityType: this.relatedEntityType,
			relatedEntityId: this.relatedEntityId,
			relationshipType: this.relationshipType,
		};
	}
}
