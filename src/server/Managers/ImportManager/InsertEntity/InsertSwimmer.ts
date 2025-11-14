import type { EntityType } from "@/server/types";
import type { TempEntityDatabase } from "../TempEntityDatabase";
import type { RawSwimmer } from "../types";
import { BaseInsertEntity } from "./BaseInsertEntity";

export class InsertSwimmer extends BaseInsertEntity {
	entityType: EntityType = "swimmer";

	async insert(
		cacheDb: TempEntityDatabase,
		swimmer: RawSwimmer,
		eventId: number,
		resultId: number,
	): Promise<number> {
		const { entityType } = this;
		const { surname, firstName } = swimmer;
		const entityName = `${surname} ${firstName}`;
		let swimmerId = cacheDb.getByName(entityType, entityName);

		if (!swimmerId) {
			const results = await this.entityManager.insert({
				entityType,
				name: entityName,
				description: `swimmer ${entityName}`,
			});

			swimmerId = results.id;
			cacheDb.insert(entityType, swimmerId, entityName);
		}

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

		return swimmerId;
	}
}
