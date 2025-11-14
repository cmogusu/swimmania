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
		const description = `${distance} ${gender} ${ageGroup}`;
		const existingEventId = cacheDb.getByName(entityType, entityName);
		if (existingEventId) {
			return existingEventId;
		}

		const eventId = await this.findOrInsertEntity(
			entityType,
			entityName,
			description,
		);

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

		cacheDb.insert(entityType, eventId, entityName);
		return eventId;
	}
}
