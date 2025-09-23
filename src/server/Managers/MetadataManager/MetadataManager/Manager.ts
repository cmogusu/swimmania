import type { EntityType } from "@/server/types";
import type { RawMetadata } from "../../../Metadata";
import { MetadataInputData } from "../MetadataInputData";
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

	async getAll(rawInputs: MetadataGetAllRawInputs): Promise<RawMetadata[]> {
		const metadataInputs = new MetadataInputData(rawInputs);
		metadataInputs.validateGetAllInputs();

		const rawMetadataArr: RawMetadata[] = await this.db.getAll(metadataInputs);
		return rawMetadataArr;
	}

	async getById(rawInputs: MetadataGetByIdRawInputs): Promise<RawMetadata> {
		const metadataInputs = new MetadataInputData(rawInputs);
		metadataInputs.validateGetByIdInputs();

		const rawMetadata = await this.db.getByMetadataId(metadataInputs);
		return rawMetadata[0];
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
