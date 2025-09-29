import z from "zod";
import type { EntityType } from "@/server/types";
import type { RawRelatedEntityInputData, RelationshipType } from "../types";

export class InsertData {
	readonly entityType: EntityType;
	readonly entityId: number;
	readonly relatedEntityType: string;
	readonly relatedEntityId?: number;
	readonly relationshipType?: RelationshipType;

	data = {};

	validator = z.object({
		entityType: z.string,
	});

	constructor(rawInputData: RawRelatedEntityInputData) {
		const {
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			relationshipType,
		} = rawInputData;
		this.data = rawInputData;
		this.entityType = entityType;
		this.entityId = entityId;
		this.relatedEntityType = relatedEntityType;
		this.relationshipType = relationshipType;
	}

	validate() {
		this.data = this.validator.parse(this.data);
	}

	toJSON() {
		return {
			entityType: this.entityType,
			entityId: this.entityId,
			relatedEntityType: this.relatedEntityType,
			relatedEntityId: this.relatedEntityId,
			relationshipType: this.relationshipType,
		};
	}
}
