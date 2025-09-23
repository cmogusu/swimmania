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

	getAll(imageData: ImageInputData): Promise<ImageDatabaseRawOutputData[]> {
		const image = imageData.toJSON();
		const query = this.query.getAll(image.entityId);
		return this.execSql<ImageDatabaseRawOutputData>(query);
	}

	getDefault(imageData: ImageInputData): Promise<ImageDatabaseRawOutputData[]> {
		const image = imageData.toJSON();
		const query = this.query.getDefault(image.entityId);
		return this.execSql<ImageDatabaseRawOutputData>(query);
	}

	getByImageId(
		imageData: ImageInputData,
	): Promise<ImageDatabaseRawOutputData[]> {
		const image = imageData.toJSON();
		const query = this.query.getById(image.entityId, image.id!);
		return this.execSql<ImageDatabaseRawOutputData>(query);
	}

	update(imageData: ImageInputData) {
		const image = imageData.toJSON();
		const query = this.query.update(
			image.id!,
			image.entityId,
			image.alt!,
			image.filepath!,
			image.isDefault!,
		);

		return this.execSql(query);
	}

	insert(imageData: ImageInputData) {
		const image = imageData.toJSON();
		const query = this.query.insert(
			image.entityId,
			image.alt!,
			image.filepath!,
			image.isDefault!,
		);

		return this.execSql(query);
	}

	deleteById(imageData: ImageInputData) {
		const image = imageData.toJSON();
		const query = this.query.deleteById(image.id!, image.entityId);

		return this.execSql(query);
	}
}
