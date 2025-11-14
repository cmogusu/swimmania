import type { EntityType } from "@/server/types";
import type { TempEntityDatabase } from "../TempEntityDatabase";
import type { RawSwimEventWithoutResults } from "../types";
import { BaseInsertEntity } from "./BaseInsertEntity";

export class InsertSwimEvent extends BaseInsertEntity {
	entityType: EntityType = "swimEvent";

	async insert(
		cacheDb: TempEntityDatabase,
		event: RawSwimEventWithoutResults,
		meetId: number | undefined,
	): Promise<number> {
		if (!event) {
			throw Error("Swim event not set");
		}

		const { entityType } = this;
		const { eventNumber, gender, ageGroup, distance } = event;
		const entityName = `Event ${eventNumber}`;
		const existingEventId = cacheDb.getByName(entityType, entityName);
		if (existingEventId) {
			return existingEventId;
		}

		const { id: eventId } = await this.entityManager.insert({
			entityType,
			name: `Event ${eventNumber}`,
			description: `${distance} ${gender} ${ageGroup}`,
		});

		cacheDb.insert(entityType, eventId, entityName);
		await this.metadataManager.upsert({
			entityType: "swimEvent",
			entityId: eventId,
			rawMetadataArr: [
				{
					name: "eventNumber",
					value: eventNumber,
				},
			],
		});

		if (meetId) {
			await this.relatedEntityIdManager.upsert({
				entityId: meetId,
				entityType: "swimMeet",
				relatedEntityId: eventId,
				relatedEntityType: "swimEvent",
				relationshipType: "contains",
			});
		}

		return eventId;
	}
}
