import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";

const entityType = "lifeguard";

export class LifeguardManager extends EntityManager {
	entityType: EntityType = entityType;

	relationships: Record<string, EntityType[]> = {
		worksAt: ["pool"],
	};

	constructor() {
		super(entityType);
	}
}
