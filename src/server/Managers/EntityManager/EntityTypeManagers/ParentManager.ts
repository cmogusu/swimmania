import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "parent";

export class ParentManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
