import { baseEntityFactory } from "@/server/utils";
import { EntityManager } from ".";

// export const entityManagerFactory = {
// 	manager: undefined as EntityManager | undefined,

// 	getInstance(): EntityManager {
// 		if (!this.manager) {
// 			this.manager = new EntityManager();
// 		}

// 		return this.manager;
// 	},
// };

export const entityManagerFactory =
	baseEntityFactory<EntityManager>(EntityManager);
