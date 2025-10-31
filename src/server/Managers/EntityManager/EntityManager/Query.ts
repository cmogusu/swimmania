import type { EntityType } from "@/server/types";
import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getAll(limit: number, offset: number) {
		this.throwIfNotSet({
			limit,
			offset,
		});

		return this.exec(`SELECT * FROM \`entity\` LIMIT ? OFFSET ?;`, [
			limit,
			offset,
		]);
	}

	getByType(entityType: string, limit: number, offset: number) {
		this.throwIfNotSet({
			entityType,
			limit,
			offset,
		});

		return this.exec(
			`SELECT * FROM \`entity\` WHERE type=? LIMIT ? OFFSET ?;`,
			[entityType, limit, offset],
		);
	}

	getByName(entityType: string, name: string) {
		this.throwIfNotSet({
			entityType,
			name,
		});

		return this.exec(
			`SELECT * FROM \`entity\` WHERE type = ? and name like ? LIMIT 1;`,
			[entityType, name],
		);
	}

	getById(entityType: string, entityId: number) {
		this.throwIfNotSet({
			entityType,
			entityId,
		});

		return this.exec(
			`SELECT * FROM \`entity\` WHERE id=? and type=? Limit 1;`,
			[entityId, entityType],
		);
	}

	getByIds(entityType: string, entityIds: number[]) {
		this.throwIfNotSet({
			entityType,
			entityIds,
			entityIdsLength: entityIds?.length,
		});

		return this.exec(
			`SELECT * FROM \`entity\` WHERE type=? and id in (${entityIds.join(",")});`,
			[entityType],
		);
	}

	getByMetadata(
		entityType: string,
		filterByMetadata: Record<string, string>[],
		limit: number,
		offset: number,
	) {
		this.throwIfNotSet({
			entityType,
			filterByMetadata,
			limit,
			offset,
		});

		const whereClause = filterByMetadata
			.map(
				(metadata) =>
					`(name = '${metadata.name}') and (value = '${metadata.value}')`,
			)
			.join(" or ");

		const metadataQuery = `SELECT DISTINCT entityId FROM \`metadata\` WHERE ${whereClause}`;
		const limitQuery = `LIMIT ${limit} OFFSET ${offset};`;

		return `SELECT t1.* FROM \`entity\` AS t1 INNER JOIN (${metadataQuery}) AS t2 ON t1.id = t2.entityId ${limitQuery}`;
	}

	deleteById(entityType: string, entityId: number) {
		this.throwIfNotSet({
			entityType,
			entityId,
		});

		return this.exec(`Delete FROM \`entity\` WHERE id = ? and type =?`, [
			entityId,
			entityType,
		]);
	}

	update(
		entityType: EntityType,
		entityId: number,
		name?: string,
		description?: string,
		userId?: number,
	) {
		this.throwIfNotSet({ entityId, entityType });

		const { names, values } = getUpdateValues({ name, description, userId });
		const joinedNames = names.map((n) => `${n}=?`).join(", ");

		return this.exec(
			`UPDATE \`entity\` SET ${joinedNames} WHERE id=? and type=?;`,
			[...values, entityId, entityType],
		);
	}

	insert(
		entityType: string,
		name: string,
		description?: string,
		userId?: number,
	) {
		this.throwIfNotSet({
			entityType,
			name,
		});

		return this.exec(
			`INSERT INTO \`entity\` (name, type, description, userId) VALUES (?, ?, ?, ?);`,
			[name, entityType, description || null, userId || null],
		);
	}
}

const getUpdateValues = (
	fields: Record<string, string | number | undefined>,
) => {
	const names = [];
	const values = [];

	for (const fieldName in fields) {
		const fieldValue = fields[fieldName];
		if (fieldValue) {
			names.push(fieldName);
			values.push(fieldValue);
		}
	}

	return { names, values };
};
