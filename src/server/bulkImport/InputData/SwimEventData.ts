import type { EntityManager } from "@/server/Managers/EntityManager";
import type { EntityType } from "@/server/types";
import type { SwimEventRawData } from "../types";

export class SwimEventData {
	entityType: EntityType = "swimEvent";

	eventId: number | undefined;
	eventNumber: string;
	sex: string;
	swimDistance: string;
	swimStroke: string;

	constructor({
		eventNumber,
		sex,
		swimDistance,
		swimStroke,
	}: SwimEventRawData) {
		this.eventNumber = eventNumber;
		this.sex = sex;
		this.swimDistance = swimDistance;
		this.swimStroke = swimStroke;
	}

	get name() {
		return `${this.swimStroke}-${this.swimDistance}-${this.sex}`;
	}

	async setEventId(swimEventManager: EntityManager) {
		const { name } = this;
		const entity = await swimEventManager.getByName({
			name,
		});

		if (entity) {
			return entity.id;
		}

		const { id: entityId } = await swimEventManager.insert({
			name,
			description: "",
			location: "",
		});

		return entityId;
	}
}
