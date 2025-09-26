import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "coach";

export class CoachManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
