import type { DatabaseSync } from "node:sqlite";
import type { ITempRawEntityDatabase, TempDatabaseEntityTypes } from "../types";
import { TempSwimEventDatabase } from "./TempSwimEventDatabase";
import { TempSwimMeetDatabase } from "./TempSwimMeetDatabase";

const tempDatabaseClasses: Record<
	TempDatabaseEntityTypes,
	new (
		entityType: TempDatabaseEntityTypes,
		db: DatabaseSync,
	) => ITempRawEntityDatabase
> = {
	swimEvent: TempSwimEventDatabase,
	swimMeet: TempSwimMeetDatabase,
};

const instances: Record<string, ITempRawEntityDatabase> = {};

export const tempEntityDatabaseFactory = {
	getInstance(
		entityType: TempDatabaseEntityTypes,
		db: DatabaseSync,
	): ITempRawEntityDatabase {
		if (!entityType) {
			throw Error("Entity type not set");
		}

		if (!(entityType in tempDatabaseClasses)) {
			throw Error("Entity type import not supported");
		}

		if (!instances[entityType]) {
			const TempEntitiyDbClass = tempDatabaseClasses[entityType];
			instances[entityType] = new TempEntitiyDbClass(entityType, db);
		}

		return instances[entityType];
	},
};
