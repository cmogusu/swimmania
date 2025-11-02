import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "comment";

export class CommentManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
