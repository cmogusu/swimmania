/** biome-ignore-all lint/style/noNonNullAssertion: TODO: Find better solution to avoid non null assertions */
import { BaseDatabase } from "../../services/BaseDatabase";
import type { ImageInputData } from "../ImageInputData";
import type { ImageDatabaseRawOutputData } from "../types";
import { Query } from "./Query";

export class Database extends BaseDatabase {
	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	async getAll(
		imageData: ImageInputData,
	): Promise<ImageDatabaseRawOutputData[]> {
		const image = imageData.toJSON();
		const [rawImages] = await this.query.getAll(image.entityId);
		return rawImages as ImageDatabaseRawOutputData[];
	}

	async getDefault(
		imageData: ImageInputData,
	): Promise<ImageDatabaseRawOutputData> {
		const image = imageData.toJSON();
		const [rawImages] = await this.query.getDefault(image.entityId);
		return (rawImages as ImageDatabaseRawOutputData[])?.[0];
	}

	async getByImageId(
		imageData: ImageInputData,
	): Promise<ImageDatabaseRawOutputData[]> {
		const image = imageData.toJSON();
		const [rawImages] = await this.query.getById(image.entityId, image.id!);
		return (rawImages as ImageDatabaseRawOutputData[])?.[0];
	}

	async update(imageData: ImageInputData) {
		const image = imageData.toJSON();
		const [updateData] = await this.query.update(
			image.id!,
			image.entityId,
			image.alt!,
			image.filepath!,
			image.isDefault!,
		);

		return updateData;
	}

	async insert(imageData: ImageInputData) {
		const image = imageData.toJSON();
		const [insertData] = await this.query.insert(
			image.entityId,
			image.alt!,
			image.filepath!,
			image.isDefault!,
		);

		return insertData;
	}

	async deleteById(imageData: ImageInputData) {
		const image = imageData.toJSON();
		const [deleteData] = await this.query.deleteById(image.id!, image.entityId);

		return deleteData;
	}
}
