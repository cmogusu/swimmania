import type { EntityManager } from "../../Managers/EntityManager";
import type { SingleEventRawData } from "../types";
import { swimmerToSwimmerIdCache, teamToTeamIdCache } from "./cache";
import type { GalaEvent } from "./GalaEvent";

export class SingleSwimmerEvent {
	swimmerId: number | undefined;
	teamId: number | undefined;

	swimmerName: string;
	team: string;

	position: number;
	seedTime: number;
	finalsTime: number;

	birthYearMin: number;
	birthYearMax: number;

	event: GalaEvent;

	constructor(rawData: SingleEventRawData, event: GalaEvent) {
		const { swimmerName, position, seedTime, finalsTime, team, ageGroup } =
			rawData;

		this.swimmerName = swimmerName;
		this.team = team;

		this.position = Number(position);
		this.seedTime = this.formatTime(seedTime);
		this.finalsTime = this.formatTime(finalsTime);

		const [min, max] = this.getAgeRange(ageGroup);
		this.birthYearMin = min;
		this.birthYearMax = max;

		this.event = event;
	}

	formatTime(time: string) {
		// TODO: Implement this
		return Number(time);
	}

	getAgeRange(ageGroup: string) {
		return ageGroup.split("-").map(Number);
	}

	async setSwimmerId(swimmerManager: EntityManager) {
		const cachedSwimmerId = swimmerToSwimmerIdCache[this.swimmerName];
		this.swimmerId = cachedSwimmerId
			? cachedSwimmerId
			: await this.getEntity(swimmerManager, this.swimmerName);
	}

	async setTeamId(teamManager: EntityManager) {
		const cachedTeamId = teamToTeamIdCache[this.team];
		this.teamId = cachedTeamId
			? cachedTeamId
			: await this.getEntity(teamManager, this.swimmerName);
	}

	async getEntity(entityManager: EntityManager, name: string): Promise<number> {
		const entity = await entityManager.getByName({
			name,
			loadImages: false,
			loadDefaultImage: false,
			loadMetadata: false,
		});

		if (entity) {
			return entity.id;
		}

		const { id: entityId } = await entityManager.insert({
			name,
			description: "",
			location: "",
		});

		return entityId;
	}
}
