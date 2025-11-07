import type { EntityManager } from "@/server/Managers/EntityManager";
import type { EntityType } from "@/server/types";
import type { SwimEventRawData } from "../types";

export class SwimEventData {
	entityType: EntityType = "swimEvent";

	entityId: number | undefined;

	eventNumber: string;
	gender: string;
	swimDistance: string;
	swimStroke: string;
	ageGroup: string;

	constructor({
		eventNumber,
		swimStroke,
		swimDistance,
		gender,
		ageGroup,
	}: SwimEventRawData) {
		this.eventNumber = eventNumber;
		this.swimStroke = swimStroke;
		this.swimDistance = swimDistance;
		this.gender = gender;
		this.ageGroup = ageGroup;
	}

	get name() {
		return `${this.swimStroke} ${this.swimDistance} ${this.gender} ${this.ageGroup}`;
	}

	async setEventId(swimEventManager: EntityManager) {
		const { name } = this;
		const entity = await swimEventManager.getByName({
			name,
		});

		if (entity) {
			return entity.entityId;
		}

		const { id: entityId } = await swimEventManager.insert({
			name,
			description: "",
		});

		this.entityId = entityId;
		return entityId;
	}
}
