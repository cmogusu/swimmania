import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "school";

export class SchoolManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
