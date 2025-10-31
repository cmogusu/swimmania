import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "swimMeet";

export class SwimMeetManager extends EntityManager {
	entityType: EntityType = entityType;

	constructor() {
		super(entityType);
	}
}
