import type { EntityType } from "@/server/types";
import type { TempEntityDatabase } from "../TempEntityDatabase";
import type { RawSwimResult } from "../types";
import { BaseInsertEntity } from "./BaseInsertEntity";

export class InsertSwimResult extends BaseInsertEntity {
	entityType: EntityType = "swimResult";

	async insert(
		cacheDb: TempEntityDatabase,
		result: RawSwimResult,
		eventId: number,
	): Promise<number> {
		if (!result) {
			throw Error("Swim result not set");
		}

		const { entityType } = this;
		const { rank, surname, firstName, age } = result;
		const entityName = `${surname} ${firstName}`;
		const existingResultId = cacheDb.getByName(entityType, entityName);
		if (existingResultId) {
			return existingResultId;
		}

		const { id: resultId } = await this.entityManager.insert({
			entityType: entityType,
			name: entityName,
			description: `${rank} ${name} ${age}`,
		});

		cacheDb.insert(entityType, resultId, entityName);
		await this.metadataManager.upsert({
			entityType: "swimResult",
			entityId: resultId,
			rawMetadataArr: [
				{
					name: "rank",
					value: rank,
				},
				{
					name: "surname",
					value: surname,
				},
				{
					name: "firstName",
					value: firstName,
				},
				{
					name: "age",
					value: age,
				},
			],
		});

		await this.relatedEntityIdManager.upsert({
			entityId: eventId,
			entityType: "swimEvent",
			relatedEntityId: resultId,
			relatedEntityType: "swimResult",
			relationshipType: "contains",
		});

		return resultId;
	}
}
