import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "pool";

export class PoolManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
