import type { EntityType } from "@/server/types";
import type { TempEntityDatabase } from "../TempEntityDatabase";
import type { RawSwimTeam } from "../types";
import { BaseInsertEntity } from "./BaseInsertEntity";

export class InsertTeam extends BaseInsertEntity {
	entityType: EntityType = "team";

	async insert(
		cacheDb: TempEntityDatabase,
		team: RawSwimTeam,
		userId: string,
		meetId: number,
		eventId: number,
		resultId: number,
		swimmerId: number,
	) {
		if (!team?.team) {
			return;
		}

		const { entityType } = this;
		const { team: entityName } = team;
		const description = `Team ${entityName}`;
		const existingEventId = cacheDb.getByName(entityType, entityName);
		if (existingEventId) {
			return existingEventId;
		}

		const teamId = await this.findOrInsertEntity(
			entityType,
			userId,
			entityName,
			description,
		);

		await this.relatedEntityIdManager.upsert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: meetId,
			relatedEntityType: "swimMeet",
			relationshipType: "participatedIn",
		});

		await this.relatedEntityIdManager.upsert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: eventId,
			relatedEntityType: "swimEvent",
			relationshipType: "participatedIn",
		});

		await this.relatedEntityIdManager.upsert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: resultId,
			relatedEntityType: "swimResult",
			relationshipType: "participatedIn",
		});

		await this.relatedEntityIdManager.upsert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: swimmerId,
			relatedEntityType: "swimmer",
			relationshipType: "competedFor_inverse",
		});

		cacheDb.insert(entityType, teamId, entityName);
		return teamId;
	}
}
