import type { ImportableEntityTypes } from "@/server/types";
import { baseEntityClassFactory } from "@/server/utils";
import {
	SwimEventImportManager,
	SwimMeetImportManager,
	SwimResultImportManager,
} from ".";
import type { ImportManager } from "./Manager/types";

const ImportManagerClasses: Record<
	ImportableEntityTypes,
	new () => ImportManager
> = {
	swimEvent: SwimEventImportManager,
	swimMeet: SwimMeetImportManager,
	swimResult: SwimResultImportManager,
};

// TODO: Delete this old implementation
// export const importManagerFactory = {
// 	getInstance(entityType: EntityType): ImportManager {
// 		if (!entityType) {
// 			throw Error("Entity type not set");
// 		}

// 		if (!(entityType in ImportManagerClasses)) {
// 			throw Error("Entity type import not supported");
// 		}

// 		if (!importManagers[entityType]) {
// 			const ImportManagerClass =
// 				ImportManagerClasses[entityType as ImportableEntityTypes];
// 			importManagers[entityType] = new ImportManagerClass();
// 		}

// 		return importManagers[entityType];
// 	},
// };

export const importManagerFactory = baseEntityClassFactory<
	ImportableEntityTypes,
	ImportManager
>(ImportManagerClasses);
