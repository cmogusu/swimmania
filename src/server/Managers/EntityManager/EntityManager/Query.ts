import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getAll(limit: number, offset: number) {
		this.throwIfNotSet({
			limit,
			offset,
		});

		return `SELECT * FROM \`entity\` LIMIT ${limit} OFFSET ${offset};`;
	}

	getByType(entityType: string, limit: number, offset: number) {
		this.throwIfNotSet({
			entityType,
			limit,
			offset,
		});

		return `SELECT * FROM \`entity\` WHERE type = '${entityType}' LIMIT ${limit} OFFSET ${offset};`;
	}

	getById(entityType: string, entityId: number) {
		this.throwIfNotSet({
			entityType,
			entityId,
		});

		return `SELECT * FROM \`entity\` WHERE id=${entityId} and type ='${entityType}' Limit 1;`;
	}

	getByIds(entityType: string, entityIds: number[]) {
		this.throwIfNotSet({
			entityType,
			entityIds,
			firstEntityId: entityIds[0],
		});

		return `SELECT * FROM \`entity\` WHERE type ='${entityType}' and id in (${entityIds.join(",")}) Limit 1;`;
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

		return `Delete FROM \`entity\` WHERE id = ${entityId} and type ='${entityType}'`;
	}

	update(
		entityType: string,
		entityId: number,
		name: string,
		description: string,
		location: string,
	) {
		const values: Record<string, string> = {
			type: entityType,
			name,
			location,
			description,
		};

		this.throwIfNotSet(values);

		const updateValuesStr = this.formatUpdateValues(values);
		return `UPDATE \`entity\` SET ${updateValuesStr} WHERE id='${entityId}';`;
	}

	insert(
		entityType: string,
		name: string,
		description: string,
		location: string,
	) {
		this.throwIfNotSet({
			entityType,
			name,
		});

		const insertValues: Record<string, string> = {
			name,
			type: entityType,
		};

		if (description) {
			insertValues["description"] = description;
		}
		if (location) {
			insertValues["location"] = location;
		}

		const { keys, values } = this.formatInsertValues(insertValues);
		return `INSERT INTO \`entity\` (${keys}) VALUES (${values});`;
	}
}
