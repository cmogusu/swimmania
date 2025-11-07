import { BaseDatabase } from "../../services/BaseDatabase";
import type {
	DeleteAllInputData,
	DeleteByIdInputData,
	GetAllInputData,
	GetByIdInputData,
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
		const [rawImages] = await this.query.getAll(imageData.entityId);
		return rawImages as ImageDatabaseRawOutputData[];
	}

	async getById(inputData: GetByIdInputData | DeleteByIdInputData) {
		const [rawImages] = await this.query.getById(
			inputData.entityId,
			inputData.id,
		);

		return (rawImages as ImageDatabaseRawOutputData[])?.[0];
	}

	async getDefault(
		imageData: GetDefaultInputData,
	): Promise<ImageDatabaseRawOutputData> {
		const [rawImages] = await this.query.getDefault(imageData.entityId);
		return (rawImages as ImageDatabaseRawOutputData[])?.[0];
	}

	async setDefault(imageData: SetDefaultInputData) {
		const { id, entityId, isDefault } = imageData;
		const [updateData] = isDefault
			? await this.query.setDefault(entityId, id)
			: await this.query.removeDefault(entityId, id);

		return updateData as { affectedRows: number };
	}

	async update(imageData: UpdateInputData) {
		const [updateData] = await this.query.update(
			imageData.id,
			imageData.entityId,
			imageData.alt,
		);

		return updateData as { affectedRows: number };
	}

	async insert(imageData: InsertInputData) {
		const [insertData] = await this.query.insert(
			imageData.entityId,
			imageData.alt,
			imageData.filepath,
		);

		return insertData as { insertId: number };
	}

	async deleteById(imageData: DeleteByIdInputData) {
		const [deleteData] = await this.query.deleteById(
			imageData.id,
			imageData.entityId,
		);

		return deleteData as { affectedRows: number };
	}

	async deleteAll(imageData: DeleteAllInputData) {
		const [deleteData] = await this.query.deleteAll(imageData.entityId);

		return deleteData as { affectedRows: number };
	}
}
