/** biome-ignore-all lint/style/noNonNullAssertion: TODO - Find better solution */
import type { RawMetadata } from "../../../Managers/MetadataManager";
import { BaseDatabase } from "../../services/BaseDatabase";
import type { MetadataInputData } from "../MetadataInputData";
import { Query } from "./Query";

export class Database extends BaseDatabase {
	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	async getAll(metadataData: MetadataInputData): Promise<RawMetadata[]> {
		const { entityId } = metadataData.getSanitizedGetAllData();
		const [rawMetadataArr] = await this.query.getAll(entityId);
		return rawMetadataArr as RawMetadata[];
	}

	async getByMetadataId(metadataData: MetadataInputData): Promise<RawMetadata> {
		const { id, entityId } = metadataData.getSanitizedGetByData();
		const [rawMetadataArr] = await this.query.getById(entityId, id);
		const rawMetadata = (rawMetadataArr as RawMetadata[])?.[0];
		return rawMetadata;
	}

	async filterBy(metadataData: MetadataInputData): Promise<number[]> {
		const { entityType, filters } = metadataData.getSanitizedFilterByData();
		const [rawMetadataArr] = await this.query.filterBy(entityType!, filters!);
		return rawMetadataArr as number[];
	}

	async update(metadataData: MetadataInputData) {
		const { id, entityId, entityType, name, value, type } =
			metadataData.getSanitizedUpdateData();

		const [updateData] = await this.query.update(
			id,
			entityId!,
			entityType!,
			name,
			value,
			type,
		);
		return updateData;
	}

	async insert(metadataData: MetadataInputData) {
		const { entityId, entityType, name, value, type } =
			metadataData.getSanitizedInsertData();

		const [insertData] = await this.query.insert(
			entityId!,
			entityType!,
			name,
			value,
			type,
		);
		return insertData;
	}

	async deleteById(metadataData: MetadataInputData) {
		const { id, entityId } = metadataData.getSanitizedDeleteData();
		const [deleteData] = await this.query.deleteById(id, entityId);

		return deleteData;
	}
}
