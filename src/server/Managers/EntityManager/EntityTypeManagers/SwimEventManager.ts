import type { EntityType } from "@/server/types";
import { EntityManager } from "../EntityManager";
import type { RawGetByNameEntityInputs, RawInsertEntityInputs } from "../types";
import { TeamManager } from "./TeamManager";

const entityType = "swimEvent";

export class SwimEventManager extends EntityManager {
	entityType: EntityType = entityType;

	teamManager: TeamManager;

	constructor() {
		super(entityType);
		this.teamManager = new TeamManager();
	}

	async insertTeam(rawInputs: RawInsertEntityInputs) {
		const { id: teamId } = await this.teamManager.insert(rawInputs);
		return teamId;
	}

	findExisting(rawInputs: RawGetByNameEntityInputs) {
		return this.getByName(rawInputs);
	}
}
