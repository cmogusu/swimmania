import type { RawMetadata } from "../../../Managers/MetadataManager";
import { BaseDatabase } from "../../services/BaseDatabase";
import type {
	DeleteInputData,
	FilterInputData,
	GetAllInputData,
	GetByIdInputData,
	InsertInputData,
	UpdateInputData,
} from "../InputData";
import { Query } from "./Query";

export class Database extends BaseDatabase {
	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	async getAll(metadataData: GetAllInputData): Promise<RawMetadata[]> {
		const { entityId } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.getAll(entityId);
		return rawMetadataArr as RawMetadata[];
	}

	async getByMetadataId(metadataData: GetByIdInputData): Promise<RawMetadata> {
		const { id, entityId } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.getById(entityId, id);
		const rawMetadata = (rawMetadataArr as RawMetadata[])?.[0];
		return rawMetadata;
	}

	async filterBy(metadataData: FilterInputData): Promise<number[]> {
		const { entityType, filters } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.filterBy(entityType, filters);
		return rawMetadataArr as number[];
	}

	async update(metadataData: UpdateInputData) {
		const { id, entityId, entityType, name, value, type } =
			metadataData.getSanitized();

		const [updateData] = await this.query.update(
			id,
			entityId,
			entityType,
			name,
			value,
			type,
		);
		return updateData;
	}

	async insert(metadataData: InsertInputData) {
		const { entityId, entityType, name, value, type } =
			metadataData.getSanitized();

		const [insertData] = await this.query.insert(
			entityId,
			entityType,
			name,
			value,
			type,
		);
		return insertData;
	}

	async deleteById(metadataData: DeleteInputData) {
		const { id, entityId } = metadataData.getSanitized();
		const [deleteData] = await this.query.deleteById(id, entityId);

		return deleteData;
	}
}
