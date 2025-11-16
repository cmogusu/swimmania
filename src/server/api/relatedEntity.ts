import { relatedEntityManagerFactory } from "@/server/Managers";
import { Log } from "../services";
import type { EntitiesData, EntityType, RelationshipType } from "../types";

const log = new Log();

export async function getRelatedEntities(
	entityType: EntityType,
	entityId: number,
	relatedEntityType: EntityType,
	relationshipType: RelationshipType,
	pageNumber: number = 1,
): Promise<EntitiesData | undefined> {
	try {
		const relatedEntityManager = relatedEntityManagerFactory.getInstance();
		const entities = await relatedEntityManager.getRelated({
			entityType,
			entityId,
			relatedEntityType,
			relationshipType,
			pageNumber,
		});

		return entities?.toJSON();
	} catch (error: unknown) {
		log.error("Unable to get entries", error as Error);
	}
}

export async function addRelatedEntities(
	entityType: EntityType,
	entityId: number,
	relatedEntityType: EntityType,
	relatedEntityId: number,
	relationshipType: RelationshipType,
): Promise<void> {
	try {
		const relatedEntityManager = relatedEntityManagerFactory.getInstance();
		return await relatedEntityManager.insertRelated(entityType, entityId, {
			id: relatedEntityId,
			type: relatedEntityType,
			relationshipType,
		});
	} catch (error: unknown) {
		log.error("Unable to add related entities", error as Error);
	}
}

export async function removeRelatedEntities(
	entityType: EntityType,
	entityId: number,
	relatedEntityType: EntityType,
	relatedEntityId: number,
	relationshipType: RelationshipType,
): Promise<{ id: number | string } | undefined> {
	try {
		const relatedEntityManager = relatedEntityManagerFactory.getInstance();
		const deleteData = await relatedEntityManager.deleteRelated(
			entityType,
			entityId,
			{
				id: relatedEntityId,
				type: relatedEntityType,
				relationshipType,
			},
		);

		return deleteData;
	} catch (error: unknown) {
		log.error("Unable to remove related entities", error as Error);
	}
}
