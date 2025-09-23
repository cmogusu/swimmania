import type { EntityType } from "@/server/types";
import type { EntityManager } from "../../Managers/EntityManager";
import type { SwimResultRawData } from "../types";
import { swimmerToSwimmerIdCache, teamToTeamIdCache } from "./cache";
import type { SwimEventData } from "./SwimEventData";

export class SwimResultData {
	entityType: EntityType = "swimResult";

	entityId: number | undefined;
	swimmerId: number | undefined;
	teamId: number | undefined;

	swimmerName: string;
	team: string;

	position: number;
	seedTime: number;
	finalsTime: number;

	ageGroup: string;
	swimEventData: SwimEventData;

	constructor(
		{
			swimmerName,
			position,
			seedTime,
			finalsTime,
			team,
			ageGroup,
		}: SwimResultRawData,
		event: SwimEventData,
	) {
		this.swimmerName = swimmerName;
		this.team = team;

		this.position = Number(position);
		this.seedTime = this.formatTime(seedTime);
		this.finalsTime = this.formatTime(finalsTime);
		this.ageGroup = ageGroup;

		this.swimEventData = event;
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

		this.entityId = entityId;
		return entityId;
	}

	getEntityData() {
		return {
			name: this.swimmerName,
			description: this.swimmerName,
			location: "",
		};
	}

	getMetadata() {
		return [
			{
				name: "position",
				value: Number(this.position),
			},
			{
				name: "ageGroup",
				value: this.ageGroup,
			},
		];
	}

	getRelated(entityId: number) {
		const currentEntity = {
			entityId,
			entityType: "swimResult",
		};

		return [
			{
				...currentEntity,
				relatedEntityId: this.swimmerId,
				relatedEntityType: "swimmer",
			},
			{
				...currentEntity,
				relatedEntityId: this.swimEventData.entityId,
				relatedEntityType: "swmEvent",
			},
			{
				...currentEntity,
				relatedEntityId: this.team,
				relatedEntityType: "team",
			},
		];
	}
}
