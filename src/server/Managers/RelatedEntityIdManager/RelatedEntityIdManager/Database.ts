// TODO: Delete this class and use query class directly?

import type { RelationshipType } from "@/server/types";
import { BaseDatabase } from "../../services/BaseDatabase";
import type {
	DeleteAllInputData,
	DeleteInputData,
	GetInputData,
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
		const {
			entityType,
			entityId,
			relatedEntityType,
			relationshipType,
			pageSize,
			offset,
		} = relationData;
		const [entityIds] = await this.query.getRelated(
			entityType,
			entityId,
			relatedEntityType,
			this.removeInverseRelationship(relationshipType),
			pageSize,
			offset,
		);

		return this.extractResultIds(entityIds);
	}

	async getNonRelated(relationData: GetInputData): Promise<number[]> {
		const {
			entityType,
			entityId,
			relatedEntityType,
			relationshipType,
			pageSize,
			offset,
		} = relationData;
		const [entityIds] = await this.query.getNonRelated(
			entityType,
			entityId,
			relatedEntityType,
			this.removeInverseRelationship(relationshipType),
			pageSize,
			offset,
		);

		return this.extractResultIds(entityIds);
	}

	async hasExisting(relationData: InsertInputData): Promise<boolean> {
		const {
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			relationshipType,
		} = relationData;
		const [itemId] = await this.query.hasExisting(
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			this.removeInverseRelationship(relationshipType),
		);

		return Boolean(itemId);
	}

	async insert(relationData: InsertInputData) {
		const {
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			relationshipType,
		} = relationData;
		const [insertData] = await this.query.insert(
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			this.removeInverseRelationship(relationshipType),
		);

		return insertData;
	}

	async deleteById(relationData: DeleteInputData) {
		const {
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			relationshipType,
		} = relationData;
		const [deleteData] = await this.query.deleteById(
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			this.removeInverseRelationship(relationshipType),
		);

		return deleteData;
	}

	async deleteAll(relationData: DeleteAllInputData) {
		const { entityId } = relationData;
		const [deleteData] = await this.query.deleteAll(entityId);

		return deleteData;
	}
}
