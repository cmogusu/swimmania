import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";
import type { EntityPostRawInputs } from "../types";
import { TeamManager } from "./TeamManager";

const entityType = "swimEvent";

export class SwimEventManager extends EntityManager {
	entityType: EntityType = entityType;

	teamManager: TeamManager;

	relationships: Record<string, EntityType[]> = {
		contains: ["swimResult"],
	};

	constructor() {
		super(entityType);
		this.teamManager = new TeamManager();
	}

	async insertTeam(rawInputs: EntityPostRawInputs) {
		const { id: teamId } = await this.teamManager.insert(rawInputs);
		return teamId;
	}
}
