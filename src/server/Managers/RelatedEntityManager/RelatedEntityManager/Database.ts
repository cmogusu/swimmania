import { BaseDatabase } from "../../services/BaseDatabase";
import type {
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

	async getRelated(relationData: GetInputData): Promise<number[]> {
		const metadata = relationData.getSanitized();
		const [entityIds] = await this.query.getRelated(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			metadata.relationshipType,
		);

		return entityIds;
	}

	async getNonRelated(relationData: GetInputData): Promise<number[]> {
		const metadata = relationData.getSanitized();
		const [entityIds] = await this.query.getNonRelated(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			metadata.relationshipType,
		);

		return entityIds;
	}

	async insert(relationData: InsertInputData) {
		const metadata = relationData.getSanitized();
		const [insertData] = await this.query.insert(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			metadata.relatedEntityId,
			metadata.relationshipType,
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
			metadata.relationshipType,
		);

		return deleteData;
	}
}
