import { type MetadataManager, metadataManagerFactory } from "../Managers";
import {
	type EntityManager,
	EntityManagerFactory,
} from "../Managers/EntityManager";
import type { SwimResultData } from "./InputData";
import type { ILineParser } from "./types";

export class BulkImport {
	multiLineText: string;
	lineParser: ILineParser;

	swimmerManager: EntityManager;
	teamManager: EntityManager;
	eventManager: EntityManager;
	swimResultManager: EntityManager;
	swimEventManager: EntityManager;
	metadataManager: MetadataManager;

	constructor(multiLineText: string, lineParser: ILineParser) {
		this.multiLineText = multiLineText;
		this.lineParser = lineParser;

		this.swimmerManager = EntityManagerFactory.getInstance("swimmer");
		this.teamManager = EntityManagerFactory.getInstance("team");
		this.eventManager = EntityManagerFactory.getInstance("event");
		this.swimResultManager = EntityManagerFactory.getInstance("swimResult");
		this.swimEventManager = EntityManagerFactory.getInstance("swimEvent");
		this.metadataManager = metadataManagerFactory.getInstance();
	}

	async import() {
		for (const lineOfText of this.multiLineText) {
			await this.importLine(lineOfText);
		}
	}

	async importLine(lineOfText: string) {
		const parsedData = this.lineParser.parse(lineOfText);
		if (!parsedData) {
			return;
		}

		if (parsedData.entityType === "swimResult") {
			await parsedData.setSwimmerId(this.teamManager);
		}
	}

	async createSwimResult(inputData: SwimResultData) {
		await inputData.setSwimmerId(this.swimmerManager);
		await inputData.setTeamId(this.teamManager);
		await this.swimResultManager.insert(
			inputData.getEntityData(),
			inputData.getMetadata(),
			inputData.getRelatedData(),
		);
	}

	createSwimEvent() {}
}
