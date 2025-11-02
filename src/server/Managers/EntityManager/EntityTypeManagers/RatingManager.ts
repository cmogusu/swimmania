import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "rating";

export class RatingManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
