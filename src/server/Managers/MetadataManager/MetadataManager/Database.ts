import type { RawMetadata } from "@/server/types";
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
		const { entityId } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.getAll(entityId);
		return rawMetadataArr as RawMetadata[];
	}

	async getList(metadataData: GetListInputData): Promise<RawMetadata[]> {
		const { entityId, entityType, names } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.getList(
			entityType,
			entityId,
			names,
		);
		return rawMetadataArr as RawMetadata[];
	}

	async getByMetadataId(metadataData: GetByIdInputData): Promise<RawMetadata> {
		const { id, entityId } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.getById(entityId, id);
		const rawMetadata = (rawMetadataArr as RawMetadata[])?.[0];
		return rawMetadata;
	}

	async filterBy(metadataData: FilterInputData): Promise<number[]> {
		const { entityType, filters } = metadataData.getSanitized();
		const [rawMetadataArr] = await this.query.filterBy(entityType, filters);
		return rawMetadataArr as number[];
	}

	async update(metadataData: UpdateInputData) {
		const { id, entityId, entityType, name, value, type } =
			metadataData.getSanitized();

		const [updateData] = await this.query.update(
			id,
			entityId,
			entityType,
			name,
			value,
			type,
		);
		return updateData;
	}

	async insert(metadataData: InsertInputData) {
		const { entityId, entityType, name, value, type } =
			metadataData.getSanitized();

		const [insertData] = await this.query.insert(
			entityId,
			entityType,
			name,
			value,
			type,
		);
		return insertData;
	}

	async deleteById(metadataData: DeleteInputData) {
		const { id, entityId } = metadataData.getSanitized();
		const [deleteData] = await this.query.deleteById(id, entityId);

		return deleteData;
	}

	async doesMetadataTableExist(tableName: string): Promise<boolean> {
		const [tableNames] = await this.query.doesMetadataTableExist(tableName);
		const tablesCount = (tableNames as unknown[])?.length;
		return Boolean(tablesCount);
	}

	async createMetadataTable(
		tableName: string,
		columns: DbTableColumn[],
	): Promise<boolean> {
		const formatedColumns = columns.map(formatColumnForDb);
		const [table] = await this.query.createMetadataTable(
			tableName,
			formatedColumns,
		);

		return Boolean(table);
	}

	async getTableColumnNames(tableName: string) {
		const defaultColumnNames = this.query.getDefaultTableColumnNames();
		const defaultColumnNamesObj = arrayToObject(defaultColumnNames);

		const [dbColumns] = await this.query.getTableColumns(tableName);
		return (dbColumns as DbColumn[])
			.map((column) => column.Field)
			.filter((column) => !defaultColumnNamesObj[column])
			.map(formatColumnNameFromDb);
	}

	async addTableColumns(
		tableName: string,
		columns: DbTableColumn[],
	): Promise<number> {
		const formatedColumns = columns.map(formatColumnForDb);
		const promises = formatedColumns.map((column) =>
			this.query.addTableColumn(tableName, column),
		);

		const results = await Promise.all(promises);
		return results.map((result) => result[0]).filter(Boolean).length;
	}

	async deleteTableColumns(
		tableName: string,
		columnNames: string[],
	): Promise<number> {
		const formatedColumnNames = columnNames.map(formatColumnNameForDb);
		const promises = formatedColumnNames.map((columnName) =>
			this.query.deleteTableColumns(tableName, columnName),
		);

		const results = await Promise.all(promises);
		console.log(results);
		return results.map((result) => result[0]).filter(Boolean).length;
	}
}
