import type { EntityType, RelationshipType } from "@/server/types";
import { BaseInputData } from "../../services";
import type { RawGetRelatedInputData } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class GetInputData extends BaseInputData {
	entityType: EntityType;
	entityId: number;
	relatedEntityType: EntityType;
	relationshipType: RelationshipType;
	validate: Validate;

	constructor({
		entityType,
		entityId,
		relatedEntityType,
		relationshipType,
		pageSize,
		pageNumber,
	}: RawGetRelatedInputData) {
		super();

		this.entityType = entityType;
		this.entityId = entityId;
		this.relatedEntityType = relatedEntityType;
		this.relationshipType = relationshipType;
		this.pageSize = pageSize;
		this.pageNumber = pageNumber;
		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.relatedEntityType);
		this.validate.relationshipType(
			this.entityType,
			this.relatedEntityType,
			this.relationshipType,
		);
	}
}
