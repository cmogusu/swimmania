import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { ANONYMOUS_USER_ID, EVENT } from "@/server/constants";
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

	// TODO - Replace anonymous user with generated random user
	userId: string = ANONYMOUS_USER_ID;
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

	importText(text: string, userId: string) {
		this.userId = userId;
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
			this.meetId = await this.insert.swimMeet(data, this.userId);
			onComplete(true);
		} catch (error: unknown) {
			this.log.error("Error importing swim meet data", error as Error);
			onComplete(false);
		}
	}

	async insertEvent(eventData: EntityInsertData<RawSwimEventWithResults>) {
		const { data, onComplete } = eventData;
		const { meetId, userId } = this;
		if (!meetId) {
			throw Error("Meet id not set");
		}

		try {
			const eventId = await this.insert.swimEvent(data, userId, meetId);
			const resultId = await this.insert.swimResult(data, userId, eventId);
			const swimmerId = await this.insert.swimmer(
				data,
				userId,
				meetId,
				eventId,
				resultId,
			);

			await this.insert.team(
				data,
				userId,
				meetId,
				eventId,
				resultId,
				swimmerId,
			);
			onComplete(true);
		} catch (error: unknown) {
			this.log.error("Error importing swim event data", error as Error);
			onComplete(false);
		}
	}
}
