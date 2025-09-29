import type { RawInsertRelatedInputData, RelationshipType } from "../types";
import { GetInputData } from "./GetInputData";
import { type Sanitize, SanitizeInstance } from "./Sanitize";

export class InsertInputData extends GetInputData {
	readonly relatedEntityId: number;
	readonly relationshipType: RelationshipType;

	sanitize: Sanitize;

	constructor({
		entityType,
		entityId,
		relatedEntityType,
		relatedEntityId,
		relationshipType,
	}: RawInsertRelatedInputData) {
		super({
			entityType,
			entityId,
			relatedEntityType,
			relationshipType,
		});

		this.relationshipType = relationshipType;
		this.relatedEntityId = relatedEntityId;

		this.sanitize = SanitizeInstance;
	}

	validateData() {
		super.validateData();
		this.validate.id(this.relatedEntityId);
		this.validate.relationshipType(this.relationshipType, true);
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
