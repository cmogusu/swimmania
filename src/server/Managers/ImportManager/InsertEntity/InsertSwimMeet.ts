import type { EntityType } from "@/server/types";
import type { TempEntityDatabase } from "../TempEntityDatabase";
import type { RawSwimMeet } from "../types";
import { BaseInsertEntity } from "./BaseInsertEntity";

export class InsertSwimMeet extends BaseInsertEntity {
	entityType: EntityType = "swimMeet";

	async insert(
		cacheDb: TempEntityDatabase,
		meet: RawSwimMeet,
	): Promise<number> {
		if (!meet?.name) {
			throw Error("Swim meet not set");
		}

		const { entityType } = this;
		const entityName = meet.name;
		const existingMeetId = cacheDb.getByName(entityType, entityName);
		if (existingMeetId) {
			return existingMeetId;
		}

		const { id: meetId } = await this.entityManager.insert({
			entityType,
			name: meet.name,
			description: meet.description,
		});

		cacheDb.insert(entityType, meetId, entityName);

		await this.metadataManager.upsert({
			entityType,
			entityId: meetId,
			rawMetadataArr: [
				{
					name: "startEndDates.startDate",
					value: meet.startDate,
				},
				{
					name: "startEndDates.endDate",
					value: meet.endDate,
				},
			],
		});

		return meetId;
	}
}
