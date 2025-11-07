import type { EntityType, ImportableEntityTypes } from "@/server/types";
import {
	type ImportManager,
	SwimEventImportManager,
	SwimMeetImportManager,
	SwimResultImportManager,
} from ".";

const importManagers: Record<string, ImportManager> = {};

const ImportManagerClasses: Record<
	ImportableEntityTypes,
	new () => ImportManager
> = {
	swimEvent: SwimEventImportManager,
	swimMeet: SwimMeetImportManager,
	swimResult: SwimResultImportManager,
};

export const importManagerFactory = {
	getInstance(entityType: EntityType): ImportManager {
		if (!entityType) {
			throw Error("Entity type not set");
		}

		if (!(entityType in ImportManagerClasses)) {
			throw Error("Entity type import not supported");
		}

		if (!importManagers[entityType]) {
			const ImportManagerClass =
				ImportManagerClasses[entityType as ImportableEntityTypes];
			importManagers[entityType] = new ImportManagerClass();
		}

		return importManagers[entityType];
	},
};
