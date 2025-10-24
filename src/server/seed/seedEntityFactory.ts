import type { EntityType } from "../types";
import { SeedEntity } from "./SeedEntity";

export const seedEntityFactory = {
	_seeders: {} as Record<string, SeedEntity>,

	getInstance(entityType: EntityType) {
		if (!this._seeders[entityType]) {
			this._seeders[entityType] = new SeedEntity(entityType);
		}

		return this._seeders[entityType];
	},
};
