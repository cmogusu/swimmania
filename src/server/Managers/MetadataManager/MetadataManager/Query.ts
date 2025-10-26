import { EntityMetadataDbTables } from "@/server/constants";
import { BaseQuery } from "@/server/Managers/services";
import type {
	DbTableColumn,
	EntityType,
	MetadataFilter,
	RawMetadata,
} from "@/server/types";
import { isString } from "@/server/utils";
import { extractMetadataNamesAndValues } from "./utils";

const COLUMNS = `id, entityId, entityType, name, COALESCE(value_tiny, value_time, value_num, value_text, value_lat, value_lng) as value`;

export class Query extends BaseQuery {
	getAll(entityType: EntityType, entityId: number) {
		this.throwIfNotSet({ entityType, entityId });

		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(`SELECT * FROM \`${tableName}\` Where entityId=?;`, [
			entityId,
		]);
	}

	getList(entityType: EntityType, entityId: number, names: string[]) {
		this.throwIfNotSet({ entityType, entityId, namesLength: names?.length });

		const joinedNames = names.join(", ");
		const tableName = EntityMetadataDbTables[entityType];

		return this.exec(
			`SELECT ${joinedNames} FROM \`${tableName}\` Where entityId=?;`,
			[entityId, entityType],
		);
	}

	getById(entityId: number, metadataId: number) {
		this.throwIfNotSet({ entityId, metadataId });
		return this.exec(
			`SELECT ${COLUMNS} FROM \`metadata\` Where id=? and entityId=?;`,
			[metadataId, entityId],
		);
	}

	filterBy(entityType: EntityType, filters: MetadataFilter[]) {
		this.throwIfNotSet({ entityType, filters });

		const whereClause = filters
			.map(({ name, comparator, value }: MetadataFilter) =>
				isString(value)
					? `${name} ${comparator} '${value}'`
					: `${name} ${comparator} ${value}`,
			)
			.join("AND ");
		return this.exec(
			`SELECT entityId FROM \`metadata\` WHERE entityType=? AND ?`,
			[entityType, whereClause],
		);
	}

	update(
		metadataId: number,
		entityType: EntityType,
		rawMetadataArr: RawMetadata[],
	) {
		this.throwIfNotSet({
			metadataId,
			entityType,
			rawMetadataArrLength: rawMetadataArr?.length,
		});

		const { names, values } = extractMetadataNamesAndValues(rawMetadataArr);
		const joinedNames = names.map((n) => `${n}=?`).join(" ");
		const tableName = EntityMetadataDbTables[entityType];

		return this.exec(`UPDATE \`${tableName}\` SET ${joinedNames} WHERE id=?;`, [
			...values,
			metadataId,
		]);
	}

	insert(
		entityId: number,
		entityType: EntityType,
		rawMetadataArr: RawMetadata[],
	) {
		this.throwIfNotSet({
			entityId,
			entityType,
			rawMetadataArrLength: rawMetadataArr?.length,
		});

		const tableName = EntityMetadataDbTables[entityType];
		const { names, values } = extractMetadataNamesAndValues(rawMetadataArr);
		const joinedNames = names.join(", ");
		const placeholders = Array(names.length).fill("?").join(",");

		return this.exec(
			`INSERT INTO \`${tableName}\` (entityId, ${joinedNames}) VALUES (?, ${placeholders});`,
			[entityId, ...values],
		);
	}

	deleteById(entityType: EntityType, entityId: number, metadataId: number) {
		this.throwIfNotSet({
			entityType,
			metadataId,
			entityId,
		});

		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(
			`Delete FROM \`${tableName}\` Where id=? and entityId=? `,
			[metadataId, entityId],
		);
	}

	doesMetadataTableExist(entityType: EntityType) {
		this.throwIfNotSet({ entityType });
		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(`SHOW TABLES LIKE '${tableName}';`, [tableName]);
	}

	createMetadataTable(entityType: EntityType, columns: DbTableColumn[]) {
		this.throwIfNotSet({
			entityType,
			columnsLength: columns?.length,
		});

		// TODO: Remove entityType column and sync tables
		const tableName = EntityMetadataDbTables[entityType];
		return this.exec(
			`
			CREATE TABLE ${tableName} (
				\`id\` INT(11) PRIMARY KEY AUTO_INCREMENT,
				\`entityId\` int(11) NOT NULL,
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
