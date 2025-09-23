import { EntityTypes } from "@/server/constants";
import type { EntityType } from "@/server/types";
import { EntityManager } from ".";

const entityManagers: Record<string, EntityManager> = {};

// biome-ignore lint/complexity/noStaticOnlyClass: Will be fixed later
export class SwmEventManagerFactory {
	static getInstance(entityType: EntityType): EntityManager {
		if (!entityType) {
			throw Error("Entity type not set");
		}

		if (!(entityType in EntityTypes)) {
			throw Error("Invalid entity type");
		}

		if (!entityManagers[entityType]) {
			entityManagers[entityType] = new EntityManager(entityType);
		}

		return entityManagers[entityType];
	}
}
