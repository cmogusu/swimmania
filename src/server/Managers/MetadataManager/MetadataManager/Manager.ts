import type { DbTableColumn, EntityType, RawMetadata } from "@/server/types";
import {
	DeleteInputData,
	FilterInputData,
	GetAllInputData,
	GetByIdInputData,
	GetListInputData,
	InsertInputData,
	UpdateInputData,
} from "../InputData";
import { entityMetadataFactory } from "../Metadata/EntityMetadata";
import type {
	RawDeleteMetadataInputs,
	RawFilterByMetadataInputs,
	RawGetAllMetadataInputs,
	RawGetByIdMetadataInputs,
	RawGetListMetadataInputs,
	RawInsertMetadataInputs,
	RawUpdateMetadataInputs,
} from "../types";
import { Database } from "./Database";
import { arrayToObject, getExtraColumnNames, getMissingColumns } from "./utils";

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

	async getList(rawInputs: RawGetListMetadataInputs): Promise<RawMetadata[]> {
		const metadataInputs = new GetListInputData(rawInputs);
		metadataInputs.validateData();

		const rawMetadataArr: RawMetadata[] = await this.db.getList(metadataInputs);
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

	async getDbTableColumnNames(
		entityType: EntityType,
	): Promise<{ dbTableName: string; schemaTableName: string }[]> {
		const entityMetadata = entityMetadataFactory.getInstance(
			entityType,
			undefined,
			true,
		);

		const dbTableColumns = entityMetadata.getDbTableColumns();
		const tableExists = await this.db.doesMetadataTableExist(entityType);
		const currentColumnNames = tableExists
			? await this.db.getTableColumnNames(entityType)
			: [];

		const currentColumnNamesObj = arrayToObject(currentColumnNames);
		return dbTableColumns.map(({ name }: DbTableColumn) => ({
			dbTableName: currentColumnNamesObj[name] ? name : "",
			schemaTableName: name,
		}));
	}

	async syncDatabase(entityType: EntityType) {
		const entityMetadata = entityMetadataFactory.getInstance(
			entityType,
			undefined,
			true,
		);

		const dbTableColumns = entityMetadata.getDbTableColumns();
		const tableExists = await this.db.doesMetadataTableExist(entityType);
		if (!tableExists) {
			await this.db.createMetadataTable(entityType, dbTableColumns);
			return;
		}

		const currentColumnNames = await this.db.getTableColumnNames(entityType);
		const currentColumnNamesObj = arrayToObject(currentColumnNames);
		const missingColumns = getMissingColumns(
			dbTableColumns,
			currentColumnNamesObj,
		);

		if (missingColumns.length) {
			await this.db.addTableColumns(entityType, missingColumns);
		}

		const extraColumnNames = getExtraColumnNames(
			dbTableColumns,
			currentColumnNamesObj,
		);

		if (extraColumnNames.length) {
			await this.db.deleteTableColumns(entityType, extraColumnNames);
		}
	}
}
