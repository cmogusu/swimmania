import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getRelated(
		entityType: string,
		entityId: number,
		relatedEntityType: string,
		limit?: number,
		offset?: number,
	) {
		this.throwIfNotSet({
			entityId,
			entityType,
		});

		const { activeColumn, relatedColumn, relationship } = this.getColumns(
			entityType,
			entityId,
			relatedEntityType,
		);
		const limitQuery = this.getLimitQuery(limit, offset);
		return `SELECT DISTINCT ${relatedColumn} AS id FROM \`relations\` where ${activeColumn}=${entityId} and relationship='${relationship}' ${limitQuery};`;
	}

	getNonRelated(
		entityType: string,
		entityId: number,
		relatedEntityType: string,
		limit: number,
		offset: number,
	) {
		this.throwIfNotSet({
			entityId,
			entityType,
			limit,
			offset,
		});

		const limitQuery = this.getLimitQuery(limit, offset);
		const relatedEntitySql = this.getRelated(
			entityType,
			entityId,
			relatedEntityType,
		);
		return `SELECT id FROM \`entity\` where type='${relatedEntityType}' and id not in (${relatedEntitySql}) ${limitQuery}`;
	}

	insert(
		entityType: string,
		entityId: number,
		relatedEntityType: string,
		relatedEntityId: number,
	) {
		this.throwIfNotSet({
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
		});

		const { entityId1, entityId2, relationship } = this.getColumns(
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
		);
		const { keys, values } = this.formatInsertValues({
			entityId1,
			entityId2,
			relationship,
		});

		return `INSERT INTO \`relations\` (${keys}) VALUES (${values});`;
	}

	deleteById(
		entityType: string,
		entityId: number,
		relatedEntityType: string,
		relatedEntityId: number,
	) {
		this.throwIfNotSet({
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
		});

		const { entityId1, entityId2, relationship } = this.getColumns(
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
		);
		const insertValues = {
			entityId1,
			entityId2,
			relationship,
		};

		const whereQuery = Object.entries(insertValues)
			.map(([key, value]) => `${key} = '${value}'`)
			.join(" AND ");

		return `DELETE FROM \`relations\` WHERE ${whereQuery}`;
	}

	getColumns(
		entityType: string,
		entityId: number,
		relatedEntityType: string,
		relatedEntityId?: number,
	) {
		const sortedEntityTypes = [entityType, relatedEntityType].sort();
		const entityTypeIndex = sortedEntityTypes.indexOf(entityType);
		const isFirst = entityTypeIndex === 0;

		return {
			entityId1: isFirst ? entityId : relatedEntityId,
			entityId2: !isFirst ? entityId : relatedEntityId,
			relationship: sortedEntityTypes.join("-"),
			activeColumn: isFirst ? "entityId1" : "entityId2",
			relatedColumn: !isFirst ? "entityId1" : "entityId2",
		};
	}

	getLimitQuery(limit?: number, offset?: number) {
		return limit && offset ? `LIMIT ${limit} OFFSET ${offset}` : "";
	}
}
