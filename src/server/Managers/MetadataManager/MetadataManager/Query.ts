import { EntityTypes } from "@/server/constants";
import type {
	DbTableColumn,
	MetadataFilter,
	MetadataValue,
} from "@/server/Managers/MetadataManager";
import { BaseQuery } from "@/server/Managers/services";
import type { EntityType, SchemaType } from "@/server/types";
import { isString } from "@/server/utils";

const METADATA_TYPE_TO_COLUMN: Record<SchemaType, string> = {
	boolean: "value_tiny",
	ratings: "value_tiny",
	date: "value_time",
	time: "value_time",
	latitude: "value_lat",
	longitude: "value_lng",
	number: "value_num",
	text: "value_text",
	options: "value_text",
	parent: "",
};

const COLUMNS = `id, entityId, entityType, name, itemIndex, COALESCE(value_tiny, value_time, value_num, value_text, value_lat, value_lng) as value`;

export class Query extends BaseQuery {
	getAll(entityId: number) {
		this.throwIfNotSet({ entityId });
		return this.exec(`SELECT ${COLUMNS} FROM \`metadata\` Where entityId=?;`, [
			entityId,
		]);
	}

	getList(entityType: EntityType, entityId: number, names: string[]) {
		this.throwIfNotSet({ entityType, entityId, metadataName: names?.[0] });
		return this.exec(
			`SELECT ${COLUMNS} FROM \`metadata\` Where entityId=? AND entityType=? AND name in ('${names.join("','")}');`,
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
		entityId: number,
		entityType: EntityType,
		name: string,
		value: MetadataValue,
		type: SchemaType,
	) {
		this.throwIfNotSet({
			metadataId,
			entityId,
			entityType,
			name,
			type,
			value,
		});

		const columnName = METADATA_TYPE_TO_COLUMN[type];
		return this.exec(
			`UPDATE \`metadata\` SET entityId=?, entityType=?, name=?, type=?, ${columnName}=? WHERE id=?;`,
			[entityId, entityType, name, type, value, metadataId],
		);
	}

	insert(
		entityId: number,
		entityType: EntityType,
		name: string,
		value: MetadataValue,
		type: SchemaType,
	) {
		this.throwIfNotSet({
			entityId,
			entityType,
			name,
			type,
			value,
		});

		const columnName = METADATA_TYPE_TO_COLUMN[type];
		return this.exec(
			`INSERT INTO \`metadata\` (entityId, entityType, name, type, ${columnName}) VALUES (?, ?, ?, ?, ?);`,
			[entityId, entityType, name, type, value],
		);
	}

	deleteById(metadataId: number, entityId: number) {
		this.throwIfNotSet({
			metadataId,
			entityId,
		});

		return this.exec(`Delete FROM \`metadata\` Where id=? and entityId=? `, [
			metadataId,
			entityId,
		]);
	}

	doesMetadataTableExist(tableName: string) {
		this.throwIfNotSet({ tableName });
		return this.exec(`SHOW TABLES LIKE '${tableName}';`, [tableName]);
	}

	createMetadataTable(tableName: string, columns: DbTableColumn[]) {
		this.throwIfNotSet({
			tableName,
			columnsLength: columns?.length,
		});

		const entityTypes = Object.keys(EntityTypes);
		return this.exec(
			`
			CREATE TABLE ${tableName} (
				\`id\` INT(11) PRIMARY KEY AUTO_INCREMENT,
				\`entityId\` int(11) NOT NULL,
				\`entityType\` enum('${entityTypes.join("','")}') DEFAULT NULL,
				\`itemIndex\` int(11) DEFAULT 0,
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

	getDefaultTableColumnNames(): string[] {
		return ["id", "entityId", "entityType", "itemIndex"];
	}

	getTableColumns(tableName: string) {
		this.throwIfNotSet({ tableName });
		return this.exec(`SHOW COLUMNS FROM \`${tableName}\`;`, []);
	}

	addTableColumn(tableName: string, column: DbTableColumn) {
		this.throwIfNotSet({
			tableName,
			column,
		});

		return this.exec(
			`ALTER TABLE ${tableName} ADD COLUMN \`${column.name}\` ${column.type} DEFAULT NULL;`,
			[],
		);
	}

	deleteTableColumns(tableName: string, columnName: string) {
		this.throwIfNotSet({
			tableName,
			columnName,
		});

		return this.exec(
			`ALTER TABLE ${tableName} DROP COLUMN \`${columnName}\`;`,
			[],
		);
	}
}
