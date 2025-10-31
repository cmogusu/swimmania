import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "swimEvent";

export class SwimResultManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
