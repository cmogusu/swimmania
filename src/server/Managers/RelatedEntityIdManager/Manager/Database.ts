// TODO: Delete this class and use query class directly?

import type { RelationshipType } from "@/server/types";
import { BaseDatabase } from "../../services/BaseDatabase";
import type {
	DeleteAllInputData,
	DeleteInputData,
	GetInputData,
	HasRelationshipInputData,
	InsertInputData,
} from "../InputData";
import { Query } from "./Query";

export class Database extends BaseDatabase {
	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	removeInverseRelationship(relationshipType: RelationshipType) {
		return relationshipType.replace("_inverse", "") as RelationshipType;
	}

	async getRelated(relationData: GetInputData): Promise<number[]> {
		const [entityIds] = await this.query.getRelated(
			relationData.entityType,
			relationData.entityId,
			relationData.relatedEntityType,
			this.removeInverseRelationship(relationData.relationshipType),
			relationData.pageSize,
			relationData.offset,
		);

		return this.extractResultIds(entityIds);
	}

	async getNonRelated(relationData: GetInputData): Promise<number[]> {
		const [entityIds] = await this.query.getNonRelated(
			relationData.entityType,
			relationData.entityId,
			relationData.relatedEntityType,
			this.removeInverseRelationship(relationData.relationshipType),
			relationData.pageSize,
			relationData.offset,
		);

		return this.extractResultIds(entityIds);
	}

	async hasExisting(relationData: HasRelationshipInputData): Promise<boolean> {
		const [results] = await this.query.hasExisting(
			relationData.entityType,
			relationData.entityId,
			relationData.relatedEntityType,
			relationData.relatedEntityId,
			this.removeInverseRelationship(relationData.relationshipType),
		);

		return Boolean((results as { id: number }[]).length);
	}

	async upsert(relationData: InsertInputData) {
		await this.query.upsert(
			relationData.entityType,
			relationData.entityId,
			relationData.relatedEntityType,
			relationData.relatedEntityId,
			this.removeInverseRelationship(relationData.relationshipType),
		);
	}

	async deleteById(relationData: DeleteInputData) {
		const [deleteData] = await this.query.deleteById(
			relationData.entityType,
			relationData.entityId,
			relationData.relatedEntityType,
			relationData.relatedEntityId,
			this.removeInverseRelationship(relationData.relationshipType),
		);

		return deleteData as { affectedRows: number };
	}

	async deleteAll(relationData: DeleteAllInputData) {
		const [deleteData] = await this.query.deleteAll(
			relationData.entityType,
			relationData.entityId,
		);

		return deleteData as { affectedRows: number };
	}
}
