import { BaseInputData } from "../../services";
import type { RawGetRelatedInputData, RelationshipType } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class GetInputData extends BaseInputData {
	readonly entityType: string;
	readonly entityId: number;
	readonly relatedEntityType: string;
	readonly relationshipType?: RelationshipType;

	validate: Validate;

	constructor({
		entityType,
		entityId,
		relatedEntityType,
		relationshipType,
	}: RawGetRelatedInputData) {
		super();

		this.entityType = entityType;
		this.entityId = entityId;
		this.relatedEntityType = relatedEntityType;
		this.relationshipType = relationshipType;

		this.validate = ValidateInstance;
	}

	validateData() {
		this.validate.entityType(this.entityType);
		this.validate.id(this.entityId);
		this.validate.entityType(this.relatedEntityType);
		this.validate.relationshipType(this.relationshipType);
	}

	getSanitized() {
		// No need to sanitize data since it is not stored in db

		return {
			entityType: this.entityType,
			entityId: this.entityId,
			relatedEntityType: this.relatedEntityType,
			relationshipType: this.relationshipType,
		};
	}
}
