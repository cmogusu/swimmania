import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { EVENT } from "@/server/constants";
import { TEMP_DB_FOLDER } from "@/server/constants/paths";
import { Log } from "@/server/services";
import { fileManagerFactory } from "../../FileManager";
import { InsertEntity } from "../InsertEntity";
import type { RawEntityDatabase } from "../RawEntityDatabase";
import type { RawSwimEventWithResults, RawSwimMeet } from "../types";
import { BaseImportManager } from "./BaseImportManager";
import { SwimResultsParser } from "./SwimResultsParser";
import type { EntityInsertData } from "./types";

export class SwimResultImportManager extends BaseImportManager {
	static async getImportPdfInstance(userId: string, file: File) {
		const fileManager = fileManagerFactory.getInstance();
		const { filePath, fileText } = await fileManager.readPdfFile({ file });
		return new SwimResultImportManager(userId, filePath, fileText);
	}

	static async getImportImageInstance(userId: string, file: File) {
		const fileManager = fileManagerFactory.getInstance();
		const { filePath, fileText } = await fileManager.readImageFile({ file });
		return new SwimResultImportManager(userId, filePath, fileText);
	}

	insert: InsertEntity;
	log: Log;

	userId: string;
	meetId: number | undefined;
	dbPath;
	isInsertingSwimEvents = false;
	IsInsertingSwimMeets = false;

	constructor(userId: string, filePath: string, fileText: string) {
		super();

		this.userId = userId;
		this.dbPath = this.getDbFilePath(filePath);

		const db = new DatabaseSync(this.dbPath);
		this.insert = new InsertEntity(db);
		this.log = new Log();

		const parser = new SwimResultsParser(db);
		const headerText = fileText.slice(0, 400);
		const rawSwmMeetDb = parser.parseSwimMeet(headerText);
		rawSwmMeetDb.on(EVENT.DATA, () => {
			this.startInsertingSwimMeet(rawSwmMeetDb);
		});

		const rawSwmEventDb = parser.parseSwimEvent(fileText);
		rawSwmEventDb.on(EVENT.DATA, () => {
			this.startInsertingSwimEvents(rawSwmEventDb);
		});
	}

	getDbFilePath(filePath: string) {
		const ext = path.extname(filePath);
		const name = path.basename(filePath, ext);
		const fileName = `${name}_$}${ext}`;
		return path.join(TEMP_DB_FOLDER, fileName);
	}

	async startInsertingSwimMeet(rawEntityDb: RawEntityDatabase<RawSwimMeet>) {
		if (this.IsInsertingSwimMeets) {
			return;
		}

		this.IsInsertingSwimMeets = true;
		let meetData = rawEntityDb.getData();
		while (meetData) {
			await this.insertMeet(meetData);
			meetData = rawEntityDb.getData();
		}

		this.IsInsertingSwimMeets = false;
	}

	async startInsertingSwimEvents(
		rawEntityDb: RawEntityDatabase<RawSwimEventWithResults>,
	) {
		if (this.isInsertingSwimEvents) {
			return;
		}

		this.isInsertingSwimEvents = true;
		let eventData = rawEntityDb.getData();
		while (eventData) {
			await this.insertEvent(eventData);
			eventData = rawEntityDb.getData();
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
