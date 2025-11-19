import { MetadataDbDefaultColumnNames } from "@/server/constants";
import type { DbTableColumn, EntityType, RawMetadata } from "@/server/types";
import { BaseDatabase } from "../../services/BaseDatabase";
import type {
	DeleteInputData,
	FilterInputData,
	GetAllInputData,
	GetListInputData,
	InsertEmptyInputData,
	InsertInputData,
	UpdateInputData,
} from "../InputData";
import { Query } from "./Query";
import {
	arrayToObject,
	formatColumnForDb,
	formatColumnNameForDb,
	formatColumnNameFromDb,
	formatMetadataForDb,
	formatMetadataFromDb,
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

	async getAll(metadataData: GetAllInputData): Promise<RawMetadata> {
		const [rawMetadata] = await this.query.getAll(
			metadataData.entityType,
			metadataData.entityId,
		);

		const results = (rawMetadata as RawMetadata[])[0];
		return formatMetadataFromDb(results);
	}

	async getList(metadataData: GetListInputData): Promise<RawMetadata> {
		const [rawMetadata] = await this.query.getList(
			metadataData.entityType,
			metadataData.entityId,
			metadataData.names,
		);

		const results = (rawMetadata as RawMetadata[])[0];
		return formatMetadataFromDb(results);
	}

	async filterBy(metadataData: FilterInputData): Promise<number[]> {
		const [results] = await this.query.filterBy(
			metadataData.entityType,
			metadataData.filters,
		);

		return this.extractResultIds(results);
	}

	async update(metadataData: UpdateInputData) {
		const [updateData] = await this.query.update(
			metadataData.entityId,
			metadataData.entityType,
			formatMetadataForDb(metadataData.rawMetadata),
		);

		return updateData as { affectedRows: number };
	}

	async insertEmpty(metadataData: InsertEmptyInputData) {
		const [insertData] = await this.query.insertEmpty(
			metadataData.entityId,
			metadataData.entityType,
		);

		return insertData as { insertId: number };
	}

	async upsert(metadataData: InsertInputData) {
		const [insertData] = await this.query.upsert(
			metadataData.entityId,
			metadataData.entityType,
			formatMetadataForDb(metadataData.rawMetadata),
		);

		return insertData as { insertId: number };
	}

	async delete(metadataData: DeleteInputData) {
		const [deleteData] = await this.query.delete(
			metadataData.entityType,
			metadataData.entityId,
		);

		return deleteData as { affectedRows: number };
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
		return results.map((result) => result[0]).filter(Boolean).length;
	}
}
