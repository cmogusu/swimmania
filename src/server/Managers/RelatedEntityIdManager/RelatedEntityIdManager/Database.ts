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
		const [itemId] = await this.query.hasExisting(
			relationData.entityType,
			relationData.entityId,
			relationData.relatedEntityType,
			relationData.relatedEntityId,
			this.removeInverseRelationship(relationData.relationshipType),
		);

		return Boolean(itemId);
	}

	async insert(relationData: InsertInputData) {
		const [insertData] = await this.query.insert(
			relationData.entityType,
			relationData.entityId,
			relationData.relatedEntityType,
			relationData.relatedEntityId,
			this.removeInverseRelationship(relationData.relationshipType),
		);

		return insertData;
	}

	async deleteById(relationData: DeleteInputData) {
		const [deleteData] = await this.query.deleteById(
			relationData.entityType,
			relationData.entityId,
			relationData.relatedEntityType,
			relationData.relatedEntityId,
			this.removeInverseRelationship(relationData.relationshipType),
		);

		return deleteData;
	}

	async deleteAll(relationData: DeleteAllInputData) {
		const [deleteData] = await this.query.deleteAll(
			relationData.entityType,
			relationData.entityId,
			relationData.relatedEntityType,
		);

		return deleteData;
	}
}
