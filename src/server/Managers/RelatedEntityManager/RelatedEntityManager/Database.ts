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

	getRelated(relationData: GetInputData): Promise<number[]> {
		const metadata = relationData.getSanitized();
		const query = this.query.getRelated(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			metadata.relationshipType,
		);

		return this.execSql<number>(query);
	}

	getNonRelated(relationData: GetInputData): Promise<number[]> {
		const metadata = relationData.getSanitized();
		const query = this.query.getNonRelated(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			metadata.relationshipType,
		);

		return this.execSql<number>(query);
	}

	insert(relationData: InsertInputData) {
		const metadata = relationData.getSanitized();
		const query = this.query.insert(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			metadata.relatedEntityId,
			metadata.relationshipType,
		);

		return this.execSql(query);
	}

	deleteById(relationData: DeleteInputData) {
		const metadata = relationData.getSanitized();
		const query = this.query.deleteById(
			metadata.entityType,
			metadata.entityId,
			metadata.relatedEntityType,
			metadata.relatedEntityId,
			metadata.relationshipType,
		);

		return this.execSql(query);
	}
}
