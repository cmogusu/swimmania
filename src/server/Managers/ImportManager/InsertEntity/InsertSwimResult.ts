import type { EntityType } from "@/server/types";
import type { TempEntityDatabase } from "../TempEntityDatabase";
import type { RawSwimResult } from "../types";
import { BaseInsertEntity } from "./BaseInsertEntity";

export class InsertSwimResult extends BaseInsertEntity {
	entityType: EntityType = "swimResult";

	async insert(
		cacheDb: TempEntityDatabase,
		result: RawSwimResult,
		userId: string,
		eventId: number,
	): Promise<number> {
		if (!result) {
			throw Error("Swim result not set");
		}

		const { entityType } = this;
		const { rank, surname, firstName, age } = result;
		const entityName = `${surname} ${firstName}`;
		const description = `${rank} ${entityName} ${age}`;
		const existingResultId = cacheDb.getByName(entityType, entityName);
		if (existingResultId) {
			return existingResultId;
		}

		const swmResultId = await this.findOrInsertEntity(
			entityType,
			userId,
			entityName,
			description,
		);

		await this.metadataManager.upsert({
			entityType,
			entityId: swmResultId,
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
			relatedEntityId: swmResultId,
			relatedEntityType: "swimResult",
			relationshipType: "contains",
		});

		cacheDb.insert(entityType, swmResultId, entityName);
		return swmResultId;
	}
}
