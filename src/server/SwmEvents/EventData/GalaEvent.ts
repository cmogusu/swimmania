import type { SwimEventManager } from "@/server/Managers";
import type { GalaEventRawData, IEventData } from "../types";

export class GalaEvent {
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
	}: GalaEventRawData) {
		this.eventNumber = eventNumber;
		this.sex = sex;
		this.swimDistance = swimDistance;
		this.swimStroke = swimStroke;
	}

	setEventId(swmEventManager: SwimEventManager) {
		const entity = await swmEventManager.getByName({
			name,
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
