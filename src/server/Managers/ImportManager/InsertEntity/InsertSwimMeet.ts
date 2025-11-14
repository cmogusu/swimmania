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

		const meetId = await this.findOrInsertEntity(
			entityType,
			meet.name,
			meet.description,
		);

		await this.metadataManager.upsert({
			entityType,
			entityId: meetId,
			rawMetadataArr: [
				{
					name: "meetDates.startDate",
					value: meet.startDate,
				},
				{
					name: "meetDates.endDate",
					value: meet.endDate,
				},
			],
		});

		cacheDb.insert(entityType, meetId, entityName);
		return meetId;
	}
}
