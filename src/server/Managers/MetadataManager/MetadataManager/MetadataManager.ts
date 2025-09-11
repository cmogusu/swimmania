import {
	EntityMetadataFactory,
	type IEntityMetadata,
	type RawMetadata,
} from "../../../Metadata";
import { MetadataInputData } from "../MetadataInputData/MetadataInputData";
import type {
	MetadataDeleteRawInputs,
	MetadataFilterByRawInputs,
	MetadataGetAllRawInputs,
	MetadataGetByIdRawInputs,
	MetadataPostRawInputs,
	MetadataUpdateRawInputs,
} from "../types";
import { Database } from "./Database";

export class MetadataManager {
	db: Database;

	constructor() {
		this.db = new Database();
	}

	async getAll(rawInputs: MetadataGetAllRawInputs): Promise<IEntityMetadata> {
		const metadataInputs = new MetadataInputData(rawInputs);
		metadataInputs.validateGetAllInputs();

		const rawMetadata: RawMetadata[] = await this.db.getAll(metadataInputs);
		return EntityMetadataFactory.getInstance(rawInputs.entityType, rawMetadata);
	}

	async getById(rawInputs: MetadataGetByIdRawInputs): Promise<IEntityMetadata> {
		const metadataInputs = new MetadataInputData(rawInputs);
		metadataInputs.validateGetByIdInputs();

		const rawMetadata = await this.db.getByMetadataId(metadataInputs);
		return EntityMetadataFactory.getInstance(rawInputs.entityType, [
			rawMetadata,
		]);
	}

	async update(rawInputs: MetadataUpdateRawInputs) {
		const metadataInputs = new MetadataInputData(rawInputs);
		metadataInputs.validateUpdateInputs();
		const updateData = await this.db.update(metadataInputs);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update metadata");
		}

		return { id: metadataInputs.id };
	}

	async insert(rawInputs: MetadataPostRawInputs) {
		const metadataInputs = new MetadataInputData(rawInputs);
		metadataInputs.validatePostInputs();
		const insertData = await this.db.update(metadataInputs);

		// @ts-ignore
		if (!insertData?.insertId) {
			throw Error("Unable to create metadata");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}

	async deleteById(rawInputs: MetadataDeleteRawInputs) {
		const metadataInputs = new MetadataInputData(rawInputs);
		metadataInputs.validateDeleteInputs();
		const deleteData = await this.db.deleteById(metadataInputs);

		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete metadata");
		}

		// @ts-ignore
		return { id: entityId };
	}

	filterBy(rawInputs: MetadataFilterByRawInputs): Promise<number[]> {
		const metadataInputs = new MetadataInputData(rawInputs);
		metadataInputs.validateFilterByInputs();
		return this.db.filterBy(metadataInputs);
	}
}
