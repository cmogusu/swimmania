import type { EntityType } from "../types";
import { SeedEntity } from "./SeedEntity";

export const seedEntityFactory = {
	_seeders: undefined as SeedEntity | undefined,

	getInstance(entityType: EntityType) {
		if (!this._seeders) {
			this._seeders = new SeedEntity(entityType);
		}

		return this._seeders;
	},
};
