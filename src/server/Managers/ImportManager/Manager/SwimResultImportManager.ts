import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { EVENT } from "@/server/constants";
import { Log } from "@/server/services";
import type { EntityType } from "@/server/types";
import { InsertEntity } from "../InsertEntity";
import type { RawSwimEventWithResults, RawSwimMeet } from "../types";
import { BaseImportManager } from "./BaseImportManager";
import { SwimResultsParser } from "./SwimResultsParser";
import type { EntityInsertData } from "./types";

const TEMP_DB_NAME = "TEMP_SWIM_RESULTS.db";

export class SwimResultImportManager extends BaseImportManager {
	insert: InsertEntity;
	parser: SwimResultsParser;
	log: Log;

	meetId: number | undefined;
	isInsertingSwimEvents = false;
	IsInsertingSwimMeets = false;

	constructor(folder: string) {
		super();

		const dbPath = path.join(folder, TEMP_DB_NAME);
		const db = new DatabaseSync(dbPath);
		this.log = new Log();
		this.insert = new InsertEntity(db);
		this.parser = new SwimResultsParser(db);
		this.registerDataListeners();
	}

	importText(text: string) {
		this.parser.parse(text);
	}

	registerDataListeners() {
		this.parser.on(EVENT.DATA_READY, (entityType: EntityType) => {
			if (entityType === "swimEvent" && this.meetId) {
				this.startInsertingSwimEvents();
			} else if (entityType === "swimMeet") {
				this.startInsertingSwimMeet();
			}
		});
	}

	async startInsertingSwimMeet() {
		if (this.IsInsertingSwimMeets) {
			return;
		}

		this.IsInsertingSwimMeets = true;
		let meetData = this.parser.getMeetData();
		while (meetData) {
			await this.insertMeet(meetData);
			meetData = this.parser.getMeetData();
		}

		this.IsInsertingSwimMeets = false;
	}

	async startInsertingSwimEvents() {
		if (this.isInsertingSwimEvents) {
			return;
		}

		this.isInsertingSwimEvents = true;
		let eventData = this.parser.getEventData();
		while (eventData) {
			await this.insertEvent(eventData);
			eventData = this.parser.getEventData();
		}

		this.isInsertingSwimEvents = false;
	}

	async insertMeet(meetData: EntityInsertData<RawSwimMeet>) {
		const { data, onComplete } = meetData;

		try {
			this.meetId = await this.insert.swimMeet(data);
			onComplete(true);
		} catch (error: unknown) {
			this.log.error("Error importing swim meet data", error as Error);
			onComplete(false);
		}
	}

	async insertEvent(eventData: EntityInsertData<RawSwimEventWithResults>) {
		const { data, onComplete } = eventData;

		try {
			await this.insert.swimEvent(data, this.meetId);
			onComplete(true);
		} catch (error: unknown) {
			this.log.error("Error importing swim event data", error as Error);
			onComplete(false);
		}
	}
}
