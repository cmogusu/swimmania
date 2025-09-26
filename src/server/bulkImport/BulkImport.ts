import { type MetadataManager, metadataManagerFactory } from "../Managers";
import {
	type EntityManager,
	entityManagerFactory,
} from "../Managers/EntityManager";
import type { SwimResultData } from "./InputData";
import type {
	RawMeetResultsData,
	RawSwimEventData,
	RawSwmMeetData,
} from "./types";

export class BulkImport {
	rawSwmMeetData: RawSwmMeetData | undefined;
	rawSwimEventDataArr: RawSwimEventData[] | undefined;

	swimmerManager: EntityManager;
	teamManager: EntityManager;
	swimMeetManager: EntityManager;
	swimResultManager: EntityManager;
	swimEventManager: EntityManager;
	metadataManager: MetadataManager;

	constructor(rawMeetResultsData: RawMeetResultsData) {
		const { swimMeet, results } = rawMeetResultsData;
		this.rawSwmMeetData = swimMeet;
		this.rawSwimEventDataArr = results;

		this.swimmerManager = entityManagerFactory.getInstance("swimmer");
		this.teamManager = entityManagerFactory.getInstance("team");
		this.swimMeetManager = entityManagerFactory.getInstance("swimMeet");
		this.swimResultManager = entityManagerFactory.getInstance("swimResult");
		this.swimEventManager = entityManagerFactory.getInstance("swimEvent");
		this.metadataManager = metadataManagerFactory.getInstance();
	}

	async importMeet() {
		if (!this.rawSwmMeetData) {
			return;
		}

		await this.importResults(this.re);
	}

	async importResults() {
		if (!this.rawSwimEventDataArr?.length) {
			return;
		}

		for (const rawSwimEventData of this.rawSwimEventDataArr) {
			await this.importLine(lineOfText);
		}
	}

	async importEvent(lineOfText: string) {
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
