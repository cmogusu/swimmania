import type { EntityType } from "@/server/types";
import type { TempEntityDatabase } from "../TempEntityDatabase";
import type { RawSwimmer } from "../types";
import { BaseInsertEntity } from "./BaseInsertEntity";

export class InsertSwimmer extends BaseInsertEntity {
	entityType: EntityType = "swimmer";

	async insert(
		cacheDb: TempEntityDatabase,
		swimmer: RawSwimmer,
		userId: string,
		meetId: number,
		eventId: number,
		resultId: number,
	): Promise<number> {
		const { entityType } = this;
		const { surname, firstName } = swimmer;
		const entityName = `${surname} ${firstName}`;
		const description = `swimmer ${entityName}`;
		const existingResultId = cacheDb.getByName(entityType, entityName);
		if (existingResultId) {
			return existingResultId;
		}

		const swimmerId = await this.findOrInsertEntity(
			entityType,
			userId,
			entityName,
			description,
		);

		await this.relatedEntityIdManager.upsert({
			entityId: swimmerId,
			entityType: "swimmer",
			relatedEntityId: meetId,
			relatedEntityType: "swimMeet",
			relationshipType: "participatedIn",
		});

		await this.relatedEntityIdManager.upsert({
			entityId: swimmerId,
			entityType: "swimmer",
			relatedEntityId: eventId,
			relatedEntityType: "swimEvent",
			relationshipType: "participatedIn",
		});

		await this.relatedEntityIdManager.upsert({
			entityId: swimmerId,
			entityType: "swimmer",
			relatedEntityId: resultId,
			relatedEntityType: "swimResult",
			relationshipType: "participatedIn",
		});

		cacheDb.insert(entityType, swimmerId, entityName);
		return swimmerId;
	}
}
