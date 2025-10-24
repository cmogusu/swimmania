import { MetadataDbDefaultColumnNames } from "@/server/constants";
import type { EntityType, RawMetadata } from "@/server/types";
import { BaseDatabase } from "../../services/BaseDatabase";
import type {
	DeleteInputData,
	FilterInputData,
	GetAllInputData,
	GetByIdInputData,
	GetListInputData,
	InsertInputData,
	UpdateInputData,
} from "../InputData";
import type { DbTableColumn } from "../Metadata/types";
import { Query } from "./Query";
import {
	arrayToObject,
	formatColumnForDb,
	formatColumnNameForDb,
	formatColumnNameFromDb,
	metadataResultToArray,
} from "./utils";

type DbColumn = {
	Field: string;
	Type: string;
};
export class Database extends BaseDatabase {
	query: Query;

	constructor() {
		super();
		this.query = new Query();
	}

	async getAll(metadataData: GetAllInputData): Promise<RawMetadata[]> {
		const { entityId, entityType } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.getAll(entityType, entityId);
		const results = (rawMetadataArr as Record<string, unknown>[])[0];
		return metadataResultToArray(results);
	}

	async getList(metadataData: GetListInputData): Promise<RawMetadata[]> {
		const { entityId, entityType, names } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.getList(
			entityType,
			entityId,
			names,
		);

		const results = (rawMetadataArr as Record<string, unknown>[])[0];
		return metadataResultToArray(results);
	}

	async getByMetadataId(metadataData: GetByIdInputData): Promise<RawMetadata> {
		const { id, entityId } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.getById(entityId, id);
		const rawMetadata = (rawMetadataArr as RawMetadata[])?.[0];
		return rawMetadata;
	}

	async filterBy(metadataData: FilterInputData): Promise<number[]> {
		const { entityType, filters } = metadataData.getSanitized();
		const [results] = await this.query.filterBy(entityType, filters);
		return this.extractResultIds(results);
	}

	async update(metadataData: UpdateInputData) {
		const { id, entityType, rawMetadataArr } = metadataData.getSanitized();
		const [updateData] = await this.query.update(
			id,
			entityType,
			rawMetadataArr,
		);

		return updateData;
	}

	async insert(metadataData: InsertInputData) {
		const { entityId, entityType, rawMetadataArr } =
			metadataData.getSanitized();

		const [insertData] = await this.query.insert(
			entityId,
			entityType,
			rawMetadataArr,
		);
		return insertData;
	}

	async deleteById(metadataData: DeleteInputData) {
		const { id, entityId, entityType } = metadataData.getSanitized();
		const [deleteData] = await this.query.deleteById(entityType, id, entityId);

		return deleteData;
	}

	async doesMetadataTableExist(entityType: EntityType): Promise<boolean> {
		const [tableNames] = await this.query.doesMetadataTableExist(entityType);
		const tablesCount = (tableNames as unknown[])?.length;
		return Boolean(tablesCount);
	}

	async createMetadataTable(
		entityType: EntityType,
		columns: DbTableColumn[],
	): Promise<boolean> {
		const formatedColumns = columns.map(formatColumnForDb);
		const [table] = await this.query.createMetadataTable(
			entityType,
			formatedColumns,
		);

		return Boolean(table);
	}

	async getTableColumnNames(entityType: EntityType) {
		const defaultColumnNamesObj = arrayToObject(MetadataDbDefaultColumnNames);
		const [dbColumns] = await this.query.getTableColumns(entityType);
		return (dbColumns as DbColumn[])
			.map((column) => column.Field)
			.filter((column) => !defaultColumnNamesObj[column])
			.map(formatColumnNameFromDb);
	}

	async addTableColumns(
		entityType: EntityType,
		columns: DbTableColumn[],
	): Promise<number> {
		const formatedColumns = columns.map(formatColumnForDb);
		const promises = formatedColumns.map((column) =>
			this.query.addTableColumn(entityType, column),
		);

		const results = await Promise.all(promises);
		return results.map((result) => result[0]).filter(Boolean).length;
	}

	async deleteTableColumns(
		entityType: EntityType,
		columnNames: string[],
	): Promise<number> {
		const formatedColumnNames = columnNames.map(formatColumnNameForDb);
		const promises = formatedColumnNames.map((columnName) =>
			this.query.deleteTableColumns(entityType, columnName),
		);

		const results = await Promise.all(promises);
		console.log(results);
		return results.map((result) => result[0]).filter(Boolean).length;
	}
}
