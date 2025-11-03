import type { EntityType } from "@/server/types";
import { BaseDatabase } from "./BaseDatabase";

export class BaseManager {
	db: BaseDatabase;

	constructor() {
		this.db = new BaseDatabase();
	}

	canViewEntities(entityType: EntityType, userId: number) {
		return true;
	}

	canViewEntity(entityId: number, userId: number | undefined) {
		return true;
	}

	canCreateEntity(entityId: number, userId: number | undefined): boolean {
		return true;
	}

	canEditEntity(entityId: number, userId: number | undefined): boolean {
		return true;
	}
}
