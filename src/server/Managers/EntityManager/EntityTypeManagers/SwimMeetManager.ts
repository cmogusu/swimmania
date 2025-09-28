import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "swimMeet";

export class SwimMeetManager extends EntityManager {
	entityType: EntityType = entityType;

	relationships: Record<string, EntityType[]> = {
		contains: ["swimEvent"],
	};

	constructor() {
		super(entityType);
	}
}
