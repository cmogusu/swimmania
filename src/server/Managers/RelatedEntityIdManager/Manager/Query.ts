import { RELATIONSHIP_DB_TABLES } from "@/server/constants";
import type { RelationshipType } from "@/server/types";
import { BaseQuery } from "../../services";

export class Query extends BaseQuery {
	getRelated(
		entityType: string,
		entityId: number | string,
		relatedEntityType: string,
		relationshipType: RelationshipType,
		limit: number,
		offset: number,
	) {
		this.throwIfNotSet({
			entityId,
			entityType,
			relatedEntityType,
			relationshipType,
			limit,
			offset,
		});

		const { activeColumn, relatedColumn, relationship } = this.getColumns(
			entityType,
			entityId,
			relatedEntityType,
		);

		const dbTable = this.getDbTable(entityType, relatedEntityType);
		return this.exec(
			`SELECT DISTINCT ${relatedColumn} AS id FROM \`${dbTable}\` WHERE ${activeColumn}=? AND relationship=? AND relationshipType=? LIMIT ? OFFSET ?;`,
			[entityId, relationship, relationshipType, limit, offset],
		);
	}

	async getNonRelated(
		entityType: string,
		entityId: number | string,
		relatedEntityType: string,
		relationshipType: RelationshipType,
		limit: number,
		offset: number,
	) {
		this.throwIfNotSet({
			entityId,
			entityType,
			relatedEntityType,
			relationshipType,
			limit,
			offset,
		});

		const [relatedEntityIdObj] = await this.getRelated(
			entityType,
			entityId,
			relatedEntityType,
			relationshipType,
			this.MaxQueryLimit,
			0,
		);

		const relatedEntityIds = (relatedEntityIdObj as { id: number }[]).map(
			({ id }) => id,
		);

		return this.exec(
			`SELECT id FROM \`entity\` WHERE type=? AND id NOT IN (?) AND relationshipType=? LIMIT ? OFFSET ?`,
			[
				relatedEntityType,
				relatedEntityIds.join(","),
				relationshipType,
				limit,
				offset,
			],
		);
	}

	hasExisting(
		entityType: string,
		entityId: number | string,
		relatedEntityType: string,
		relatedEntityId: number | string,
		relationshipType: RelationshipType,
	) {
		this.throwIfNotSet({
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			relationshipType,
		});

		const dbTable = this.getDbTable(entityType, relatedEntityType);
		const { entityId1, entityId2, activeColumn, relatedColumn, relationship } =
			this.getColumns(entityType, entityId, relatedEntityType, relatedEntityId);

		return this.exec(
			`SELECT * FROM \`${dbTable}\` WHERE ${activeColumn}=? AND ${relatedColumn}=? AND relationship=? AND relationshipType=?;`,
			[entityId1, entityId2, relationship, relationshipType],
		);
	}

	upsert(
		entityType: string,
		entityId: number | string,
		relatedEntityType: string,
		relatedEntityId: number | string,
		relationshipType: RelationshipType,
	) {
		this.throwIfNotSet({
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			relationshipType,
		});

		const dbTable = this.getDbTable(entityType, relatedEntityType);
		const { entityId1, entityId2, relationship } = this.getColumns(
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
		);

		this.exec(
			`INSERT INTO \`${dbTable}\` (entityId1, entityId2, relationship, relationshipType) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE entityId1=?, entityId2=?, relationship=?, relationshipType=?;`,
			[
				entityId1,
				entityId2,
				relationship,
				relationshipType,
				entityId1,
				entityId2,
				relationship,
				relationshipType,
			],
		);
	}

	deleteById(
		entityType: string,
		entityId: number | string,
		relatedEntityType: string,
		relatedEntityId: number | string,
		relationshipType: RelationshipType,
	) {
		this.throwIfNotSet({
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
			relationshipType,
		});

		const { entityId1, entityId2, relationship } = this.getColumns(
			entityType,
			entityId,
			relatedEntityType,
			relatedEntityId,
		);

		const dbTable = this.getDbTable(entityType, relatedEntityType);
		return this.exec(
			`DELETE FROM \`${dbTable}\` WHERE entityId1=? AND entityId2=? AND relationship=? AND relationshipType=?;`,
			[entityId1, entityId2, relationship, relationshipType],
		);
	}

	deleteAll(entityType: string, entityId: number | string) {
		this.throwIfNotSet({
			entityId,
			entityType,
		});

		// TODO: Delete from all tables
		const dbTable = this.getDbTable(entityType, entityType);
		return this.exec(
			`DELETE FROM \`${dbTable}\` WHERE entityId1=? OR entityId2=?;`,
			[entityId, entityId],
		);
	}

	getColumns(
		entityType: string,
		entityId: number | string,
		relatedEntityType: string,
		relatedEntityId?: number | string,
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

	getDbTable(entityType: string, relatedEntityType: string): string {
		if (entityType in RELATIONSHIP_DB_TABLES) {
			return RELATIONSHIP_DB_TABLES[entityType];
		}

		if (relatedEntityType in RELATIONSHIP_DB_TABLES) {
			return RELATIONSHIP_DB_TABLES[relatedEntityType];
		}

		return "relations";
	}
}
