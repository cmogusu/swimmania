import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "coach";

export class CoachManager extends EntityManager {
	entityType: EntityType = entityType;

	relationships: Record<string, EntityType[]> = {
		worksAt: ["school", "pool"],
		canBeFoundAt: ["school", "pool"],
		manages: ["team"],
	};

	constructor() {
		super(entityType);
	}
}
