import { EntityMetadataDbTables } from "@/server/constants";
import { BaseQuery } from "@/server/Managers/services";
import type {
	DbTableColumn,
	EntityType,
	MetadataFilter,
	MetadataValue,
	RawMetadata,
} from "@/server/types";
import { extractMetadataNamesAndValues } from "./utils";

export class Query extends BaseQuery {
	getAll(entityType: EntityType, entityId: number) {
		this.throwIfNotSet({ entityType, entityId });

		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(`SELECT * FROM \`${tableName}\` Where entityId=?;`, [
			entityId,
		]);
	}

	getList(entityType: EntityType, entityId: number, names: string[]) {
		this.throwIfNotSet({ entityType, entityId, names });

		const joinedNames = names.join(", ");
		const tableName = EntityMetadataDbTables[entityType];

		return this.exec(
			`SELECT entityId, ${joinedNames} FROM \`${tableName}\` Where entityId=?;`,
			[entityId],
		);
	}

	filterBy(entityType: EntityType, filters: MetadataFilter[]) {
		this.throwIfNotSet({ entityType, filters });

		const placeHolders: string[] = [];
		const values: MetadataValue[] = [];
		filters.forEach(({ name, comparator, value }: MetadataFilter) => {
			placeHolders.push(`${name} ${comparator} ? `);
			values.push(value);
		});

		return this.exec(
			`SELECT entityId FROM \`metadata\` WHERE entityType=? AND ?`,
			[entityType, ...values],
		);
	}

	filterEntitiesBy(entityType: EntityType, filters: MetadataFilter[]) {
		this.throwIfNotSet({ entityType, filters });

		const { placeHolders, values } =
			this.getFilterPlaceholdersAndValues(filters);

		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(
			`SELECT * FROM \`${tableName}\` as m INNER JOIN \`entity\` as e on e.id=m.entityId WHERE e.id=? AND ${placeHolders.join(" AND ")};`,
			[entityType, ...values],
		);
	}

	getFilterPlaceholdersAndValues(filters: MetadataFilter[]) {
		const placeHolders: string[] = [];
		const values: MetadataValue[] = [];
		filters.forEach(({ name, comparator, value }: MetadataFilter) => {
			placeHolders.push(`${name} ${comparator} ? `);
			values.push(value);
		});

		return { placeHolders, values };
	}

	insertEmpty(entityId: number, entityType: EntityType) {
		this.throwIfNotSet({
			entityId,
			entityType,
		});

		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(`INSERT INTO \`${tableName}\` (entityId) VALUES (?);`, [
			entityId,
		]);
	}

	update(entityId: number, entityType: EntityType, rawMetadata: RawMetadata) {
		this.throwIfNotSet({
			entityId,
			entityType,
			rawMetadata,
		});

		const tableName = EntityMetadataDbTables[entityType];
		const { names, values } = extractMetadataNamesAndValues(rawMetadata);
		const joinedNames = names.map((n) => `${n}=?`).join(", ");

		return this.exec(
			`UPDATE \`${tableName}\` SET ${joinedNames} WHERE entityId=?;`,
			[...values, entityId],
		);
	}

	upsert(entityId: number, entityType: EntityType, rawMetadata: RawMetadata) {
		this.throwIfNotSet({
			entityId,
			entityType,
			rawMetadata,
		});

		const tableName = EntityMetadataDbTables[entityType];
		const { names, values } = extractMetadataNamesAndValues(rawMetadata);
		const insertColumns = names.join(", ");
		const insertPlaceholders = Array(names.length).fill("?").join(",");
		const updateColumns = names.map((n) => `${n}=?`).join(", ");

		return this.exec(
			`INSERT INTO \`${tableName}\` (entityId, ${insertColumns}) VALUES (?, ${insertPlaceholders}) ON DUPLICATE KEY UPDATE ${updateColumns};`,
			[entityId, ...values, ...values],
		);
	}

	delete(entityType: EntityType, entityId: number) {
		this.throwIfNotSet({
			entityType,
			entityId,
		});

		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(`Delete FROM \`${tableName}\` Where entityId=? `, [
			entityId,
		]);
	}

	doesMetadataTableExist(entityType: EntityType) {
		this.throwIfNotSet({ entityType });
		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(`SHOW TABLES LIKE '${tableName}';`, [tableName]);
	}

	createMetadataTable(entityType: EntityType, columns: DbTableColumn[]) {
		this.throwIfNotSet({
			entityType,
			columns,
		});

		// TODO: Remove entityType column and sync tables
		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(
			`
			CREATE TABLE ${tableName} (
				\`entityId\` INT(11) PRIMARY KEY AUTO_INCREMENT,
				${columns
					.map(
						({ name, type }: DbTableColumn) =>
							`\`${name}\` ${type} DEFAULT NULL`,
					)
					.join(", ")}
			);`,
			[],
		);
	}

	getTableColumns(entityType: EntityType) {
		this.throwIfNotSet({ entityType });
		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(`SHOW COLUMNS FROM \`${tableName}\`;`, []);
	}

	addTableColumn(entityType: EntityType, column: DbTableColumn) {
		this.throwIfNotSet({
			entityType,
			column,
		});

		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(
			`ALTER TABLE ${tableName} ADD COLUMN \`${column.name}\` ${column.type} DEFAULT NULL;`,
			[],
		);
	}

	deleteTableColumns(entityType: EntityType, columnName: string) {
		this.throwIfNotSet({
			entityType,
			columnName,
		});

		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(
			`ALTER TABLE ${tableName} DROP COLUMN \`${columnName}\`;`,
			[],
		);
	}
}
