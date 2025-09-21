import type {
	MetadataFilter,
	MetadataValue,
	SchemaType,
} from "../../../Metadata";
import type { EntityType } from "../../../types";
import { isString } from "../../../utils";
import { BaseQuery } from "../../services";

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
	getAll(entityId: number): string {
		this.throwIfNotSet({ entityId });
		return `SELECT ${COLUMNS} FROM \`metadata\` Where entityId = ${entityId};`;
	}

	getById(entityId: number, metadataId: number): string {
		this.throwIfNotSet({ entityId, metadataId });
		return `SELECT ${COLUMNS} FROM \`metadata\` Where id =${metadataId} and entityId =${entityId};`;
	}

	filterBy(entityType: EntityType, filters: MetadataFilter[]): string {
		this.throwIfNotSet({ entityType, filters });

		const whereClause = filters
			.map(({ name, comparator, value }: MetadataFilter) =>
				isString(value)
					? `${name} ${comparator} '${value}'`
					: `${name} ${comparator} ${value}`,
			)
			.join(" and ");
		return `SELECT entityId FROM \`metadata\` Where entityType = ${entityType} and ${whereClause}`;
	}

	update(
		metadataId: number,
		entityId: number,
		entityType: EntityType,
		name: string,
		value: MetadataValue,
		type: SchemaType,
	) {
		const inputValues: Record<string, MetadataValue> = {
			entityId,
			entityType,
			name,
		};

		this.throwIfNotSet({
			type,
			value,
			metadataId,
			...inputValues,
		});

		const columnName = METADATA_TYPE_TO_COLUMN[type];
		inputValues[columnName] = value;

		const updateValuesStr = this.formatUpdateValues(inputValues);
		return `UPDATE \`metadata\` SET ${updateValuesStr} WHERE id='${metadataId}';`;
	}

	insert(
		entityId: number,
		entityType: EntityType,
		name: string,
		value: MetadataValue,
		type: SchemaType,
	) {
		const inputValues: Record<string, MetadataValue> = {
			entityId,
			entityType,
			name,
		};
		this.throwIfNotSet({
			type,
			value,
			...inputValues,
		});

		const columnName = METADATA_TYPE_TO_COLUMN[type];
		inputValues[columnName] = value;

		const { keys, values } = this.formatInsertValues(inputValues);
		return `INSERT INTO \`metadata\` (${keys}) VALUES (${values});`;
	}

	deleteById(metadataId: number, entityId: number) {
		this.throwIfNotSet({
			metadataId,
			entityId,
		});

		return `Delete FROM \`metadata\` Where id = ${metadataId} and entityId = ${entityId} `;
	}
}
