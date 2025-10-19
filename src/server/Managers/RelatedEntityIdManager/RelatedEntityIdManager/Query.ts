import type { RowDataPacket } from "mysql2";
import { BaseQuery } from "../../services";
import type { RelationshipType } from "../types";

export class Query extends BaseQuery {
	getRelated(
		entityType: string,
		entityId: number,
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

		return this.exec(
			`SELECT DISTINCT ? AS id FROM \`relations\` WHERE ?=? AND relationship=? AND relationshipType=? LIMIT ? OFFSET ?;`,
			[
				relatedColumn,
				activeColumn,
				entityId,
				relationship,
				relationshipType,
				limit,
				offset,
			],
		);
	}

	async getNonRelated(
		entityType: string,
		entityId: number,
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

		const [relatedEntityIds] = await this.getRelated(
			entityType,
			entityId,
			relatedEntityType,
			relationshipType,
			this.MaxQueryLimit,
			0,
		);

		return this.exec(
			`SELECT id FROM \`entity\` WHERE type=? AND id NOT IN (?) AND relationshipType=? LIMIT ? OFFSET ?`,
			[
				relatedEntityType,
				(relatedEntityIds as RowDataPacket[]).join(","),
				relationshipType,
				limit,
				offset,
			],
		);
	}

	insert(
		entityType: string,
		entityId: number,
		relatedEntityType: string,
		relatedEntityId: number,
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

		return this.exec(
			`INSERT INTO \`relations\` (entityId1, entityId2, relationship, relationshipType) VALUES (?, ?, ?, ?);`,
			[entityId1, entityId2, relationship, relationshipType],
		);
	}

	deleteById(
		entityType: string,
		entityId: number,
		relatedEntityType: string,
		relatedEntityId: number,
		relationshipType?: RelationshipType,
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

		const relationshipTypeClause = relationshipType
			? ` AND relationshipType = ${relationshipType}`
			: "";

		return this.exec(
			`DELETE FROM \`relations\` WHERE entityId1=? AND entityId2=? AND relationship=? ?;`,
			[entityId1, entityId2, relationship, relationshipTypeClause],
		);
	}

	deleteAll(entityId: number) {
		this.throwIfNotSet({
			entityId,
		});

		return this.exec(
			`DELETE FROM \`relations\` WHERE entityId1=? OR entityId2=?;`,
			[entityId, entityId],
		);
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
