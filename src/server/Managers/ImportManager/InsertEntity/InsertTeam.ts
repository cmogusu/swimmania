import type { EntityType } from "@/server/types";
import type { TempEntityDatabase } from "../TempEntityDatabase";
import type { RawSwimTeam } from "../types";
import { BaseInsertEntity } from "./BaseInsertEntity";

export class InsertTeam extends BaseInsertEntity {
	entityType: EntityType = "team";

	async insert(
		cacheDb: TempEntityDatabase,
		team: RawSwimTeam,
		swimmerId: number,
		resultId: number,
	) {
		const { entityType } = this;
		const { name: entityName } = team;
		let teamId: number = cacheDb.getByName(entityType, entityName);

		if (!teamId) {
			const results = await this.entityManager.insert({
				entityType,
				name: entityName,
				description: `swimmer ${entityName}`,
			});

			teamId = results.id;
			cacheDb.insert(entityType, teamId, entityName);
		}

		await this.relatedEntityIdManager.upsert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: swimmerId,
			relatedEntityType: "swimmer",
			relationshipType: "contains",
		});

		await this.relatedEntityIdManager.upsert({
			entityId: teamId,
			entityType: "team",
			relatedEntityId: resultId,
			relatedEntityType: "swimResult",
			relationshipType: "participatedIn",
		});
	}
}
