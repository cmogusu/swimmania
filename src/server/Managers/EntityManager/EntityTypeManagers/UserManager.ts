import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "user";

export class UserManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
