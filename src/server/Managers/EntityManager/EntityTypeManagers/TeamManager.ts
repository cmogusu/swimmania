import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "team";

export class TeamManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
