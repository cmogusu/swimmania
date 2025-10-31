import { EntityTypes } from "@/server/constants";
import type { EntityType } from "@/server/types";
import type { EntityManager } from ".";
import {
	CoachManager,
	LifeguardManager,
	ParentManager,
	PoolManager,
	SchoolManager,
	SwimEventManager,
	SwimMeetManager,
	SwimmerManager,
	SwimResultManager,
	TeamManager,
	UserManager,
} from "./EntityTypeManagers";

const managerClasses: Record<EntityType, new () => EntityManager> = {
	coach: CoachManager,
	lifeguard: LifeguardManager,
	parent: ParentManager,
	pool: PoolManager,
	school: SchoolManager,
	team: TeamManager,
	swimResult: SwimResultManager,
	swimMeet: SwimMeetManager,
	swimmer: SwimmerManager,
	swimEvent: SwimEventManager,
	user: UserManager,
};

const entityManagers: Record<string, EntityManager> = {};

export const entityManagerFactory = {
	getInstance(entityType: EntityType): EntityManager {
		if (!entityType) {
			throw Error("Entity type not set");
		}

		if (!(entityType in EntityTypes)) {
			console.log(entityType, EntityTypes);
			throw Error("Invalid entity type");
		}

		if (!entityManagers[entityType]) {
			const ManagerClass = managerClasses[entityType];
			entityManagers[entityType] = new ManagerClass();
		}

		return entityManagers[entityType];
	},
};
