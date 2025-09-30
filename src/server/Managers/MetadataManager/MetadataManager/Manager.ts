import type { EntityType } from "@/server/types";
import type { RawMetadata } from "../../../Managers/MetadataManager";
import {
	DeleteInputData,
	FilterInputData,
	GetAllInputData,
	GetByIdInputData,
	InsertInputData,
	UpdateInputData,
} from "../InputData";
import type {
	RawDeleteMetadataInputs,
	RawFilterByMetadataInputs,
	RawGetAllMetadataInputs,
	RawGetByIdMetadataInputs,
	RawInsertMetadataInputs,
	RawUpdateMetadataInputs,
} from "../types";
import { Database } from "./Database";

export class MetadataManager {
	db: Database;

	constructor() {
		this.db = new Database();
	}

	async getAll(rawInputs: RawGetAllMetadataInputs): Promise<RawMetadata[]> {
		const metadataInputs = new GetAllInputData(rawInputs);
		metadataInputs.validateData();

		const rawMetadataArr: RawMetadata[] = await this.db.getAll(metadataInputs);
		return rawMetadataArr;
	}

	async getById(rawInputs: RawGetByIdMetadataInputs): Promise<RawMetadata> {
		const metadataInputs = new GetByIdInputData(rawInputs);
		metadataInputs.validateData();

		const rawMetadata = await this.db.getByMetadataId(metadataInputs);
		return rawMetadata;
	}

	async update(rawInputs: RawUpdateMetadataInputs) {
		const metadataInputs = new UpdateInputData(rawInputs);
		metadataInputs.validateData();
		const updateData = await this.db.update(metadataInputs);

		// @ts-ignore
		if (!updateData?.affectedRows) {
			throw Error("Unable to update metadata");
		}

		return { id: metadataInputs.id };
	}

	async insert(rawInputs: RawInsertMetadataInputs) {
		const metadataInputs = new InsertInputData(rawInputs);
		metadataInputs.validateData();
		const insertData = await this.db.insert(metadataInputs);

		// @ts-ignore
		if (!insertData?.insertId) {
			throw Error("Unable to create metadata");
		}

		// @ts-ignore
		return { id: insertData.insertId };
	}

	async insertBulk(
		entityType: EntityType,
		entityId: number,
		rawMetadataArr: RawMetadata[],
	) {
		const insertPromises = rawMetadataArr.map((rawMetadata) =>
			this.insert({
				entityType,
				entityId,
				...rawMetadata,
			}),
		);

		await Promise.all(insertPromises);
	}

	async deleteById(rawInputs: RawDeleteMetadataInputs) {
		const metadataInputs = new DeleteInputData(rawInputs);
		metadataInputs.validateData();
		const deleteData = await this.db.deleteById(metadataInputs);

		// @ts-ignore
		if (!deleteData?.affectedRows) {
			throw Error("Unable to delete metadata");
		}

		// @ts-ignore
		return { id: entityId };
	}

	filterBy(rawInputs: RawFilterByMetadataInputs): Promise<number[]> {
		const metadataInputs = new FilterInputData(rawInputs);
		metadataInputs.validateData();
		return this.db.filterBy(metadataInputs);
	}
}
