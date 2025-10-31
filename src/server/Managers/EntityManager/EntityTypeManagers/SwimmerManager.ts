import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "swimmer";

export class SwimmerManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
