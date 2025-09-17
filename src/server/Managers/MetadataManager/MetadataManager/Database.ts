/** biome-ignore-all lint/style/noNonNullAssertion: TODO - Find better solution */
import type { RawMetadata } from "../../../Metadata";
import { BaseDatabase } from "../../services/BaseDatabase";
import type { MetadataInputData } from "../MetadataInputData/MetadataInputData";
import { Query } from "./Query";

export class Database extends BaseDatabase {
	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	getAll(metadataData: MetadataInputData): Promise<RawMetadata[]> {
		const { entityId } = metadataData.getSanitizedGetAllData();
		const query = this.query.getAll(entityId);
		return this.execSql<RawMetadata>(query);
	}

	getByMetadataId(metadataData: MetadataInputData): Promise<RawMetadata[]> {
		const { id, entityId } = metadataData.getSanitizedGetByData();
		const query = this.query.getById(entityId, id);
		return this.execSql<RawMetadata>(query);
	}

	filterBy(metadataData: MetadataInputData): Promise<number[]> {
		const { entityType, filters } = metadataData.getSanitizedFilterByData();
		const query = this.query.filterBy(entityType!, filters!);
		return this.execSql<number>(query);
	}

	update(metadataData: MetadataInputData) {
		const { id, entityId, entityType, name, value, type } =
			metadataData.getSanitizedUpdateData();

		const query = this.query.update(
			id,
			entityId!,
			entityType!,
			name,
			value,
			type,
		);
		return this.execSql(query);
	}

	insert(metadataData: MetadataInputData) {
		const { entityId, entityType, name, value, type } =
			metadataData.getSanitizedInsertData();

		const query = this.query.insert(entityId!, entityType!, name, value, type);
		return this.execSql(query);
	}

	deleteById(metadataData: MetadataInputData) {
		const { id, entityId } = metadataData.getSanitizedDeleteData();
		const query = this.query.deleteById(id, entityId);

		return this.execSql(query);
	}
}
