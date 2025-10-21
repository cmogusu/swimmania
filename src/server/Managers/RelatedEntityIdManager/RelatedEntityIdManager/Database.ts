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
import { extractIds } from "./utils";

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
		const metadata = relationData.getSanitized();
		const [entityIds] = await this.query.getRelated(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			this.removeInverseRelationship(metadata.relationshipType),
			metadata.pageSize,
			metadata.offset,
		);

		return extractIds(entityIds);
	}

	async getNonRelated(relationData: GetInputData): Promise<number[]> {
		const metadata = relationData.getSanitized();
		const [entityIds] = await this.query.getNonRelated(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			this.removeInverseRelationship(metadata.relationshipType),
			metadata.pageSize,
			metadata.offset,
		);

		return extractIds(entityIds);
	}

	async insert(relationData: InsertInputData) {
		const metadata = relationData.getSanitized();
		const [insertData] = await this.query.insert(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			metadata.relatedEntityId,
			this.removeInverseRelationship(metadata.relationshipType),
		);

		return insertData;
	}

	async deleteById(relationData: DeleteInputData) {
		const metadata = relationData.getSanitized();
		const [deleteData] = await this.query.deleteById(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			metadata.relatedEntityId,
			this.removeInverseRelationship(metadata.relationshipType),
		);

		return deleteData;
	}

	async deleteAll(relationData: DeleteAllInputData) {
		const metadata = relationData.getSanitized();
		const [deleteData] = await this.query.deleteAll(metadata.entityId);

		return deleteData;
	}
}
