import type { MetadataFilter, MetadataValue } from "../../../Metadata";
import type { EntityType } from "../../../types";
import { isString } from "../../../utils";
import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getAll(entityId: number): string {
		this.throwIfNotSet({ entityId });
		return `SELECT * FROM \`metadata\` Where entityId = ${entityId};`;
	}

	getById(entityId: number, metadataId: number): string {
		this.throwIfNotSet({ entityId, metadataId });
		return `SELECT * FROM \`metadata\` Where id =${metadataId} and entityId =${entityId};`;
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
	) {
		const inputValues = {
			entityId,
			entityType,
			name,
			value,
		};

		this.throwIfNotSet({
			metadataId,
			...inputValues,
		});

		const updateValuesStr = this.formatUpdateValues(inputValues);
		return `UPDATE \`metadata\` SET ${updateValuesStr} WHERE id='${metadataId}';`;
	}

	insert(
		entityId: number,
		entityType: EntityType,
		name: string,
		value: MetadataValue,
	) {
		const inputValues = { entityId, entityType, name, value };
		this.throwIfNotSet(inputValues);

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
