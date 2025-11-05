import { BaseDatabase } from "../../services/BaseDatabase";
import type {
	DeleteInputData,
	GetAllInputData,
	GetDefaultInputData,
	InsertInputData,
	SetDefaultInputData,
	UpdateInputData,
} from "../InputData";
import type { ImageDatabaseRawOutputData } from "../types";
import { Query } from "./Query";

export class Database extends BaseDatabase {
	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	async getAll(
		imageData: GetAllInputData,
	): Promise<ImageDatabaseRawOutputData[]> {
		const { entityId } = imageData;
		const [rawImages] = await this.query.getAll(entityId);
		return rawImages as ImageDatabaseRawOutputData[];
	}

	async getDefault(
		imageData: GetDefaultInputData,
	): Promise<ImageDatabaseRawOutputData> {
		const { entityId } = imageData;
		const [rawImages] = await this.query.getDefault(entityId);
		return (rawImages as ImageDatabaseRawOutputData[])?.[0];
	}

	async setDefault(imageData: SetDefaultInputData) {
		const { id, entityId, isDefault } = imageData;
		const [updateData] = isDefault
			? await this.query.setDefault(entityId, id)
			: await this.query.removeDefault(entityId, id);

		return updateData;
	}

	async update(imageData: UpdateInputData) {
		const { id, entityId, alt } = imageData;
		const [updateData] = await this.query.update(id, entityId, alt);

		return updateData;
	}

	async insert(imageData: InsertInputData) {
		const { entityId, alt, filepath } = imageData;
		const [insertData] = await this.query.insert(entityId, alt, filepath);

		return insertData;
	}

	async deleteById(imageData: DeleteInputData) {
		const { id, entityId } = imageData;
		const [deleteData] = await this.query.deleteById(id, entityId);

		return deleteData;
	}
}
