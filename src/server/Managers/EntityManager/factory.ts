import { EntityTypeObj } from "@/server/constants";
import type { EntityType } from "@/server/types";
import { EntityManager } from ".";

const entityManagers: Record<string, EntityManager> = {};

export const entityManagerFactory = {
	getInstance(entityType: EntityType): EntityManager {
		if (!entityType) {
			throw Error("Entity type not set");
		}

		if (!(entityType in EntityTypeObj)) {
			throw Error("Invalid entity type");
		}

		if (!entityManagers[entityType]) {
			entityManagers[entityType] = new EntityManager(entityType);
		}

		return entityManagers[entityType];
	},
};
