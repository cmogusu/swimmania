import type { DatabaseSync } from "node:sqlite";
import { TempEntityDatabase } from "../TempEntityDatabase";
import type {
	RawSwimEventWithoutResults,
	RawSwimMeet,
	RawSwimmer,
	RawSwimResult,
	RawSwimTeam,
} from "../types";
import { InsertSwimEvent } from "./InsertSwimEvent";
import { InsertSwimMeet } from "./InsertSwimMeet";
import { InsertSwimmer } from "./InsertSwimmer";
import { InsertSwimResult } from "./InsertSwimResult";
import { InsertTeam } from "./InsertTeam";

export class InsertEntity {
	insertSwimEvent: InsertSwimEvent;
	insertSwimMeet: InsertSwimMeet;
	insertSwimmer: InsertSwimmer;
	insertSwimResult: InsertSwimResult;
	insertTeam: InsertTeam;
	cacheDb: TempEntityDatabase;

	constructor(db: DatabaseSync) {
		this.cacheDb = new TempEntityDatabase(db);
		this.insertSwimEvent = new InsertSwimEvent();
		this.insertSwimMeet = new InsertSwimMeet();
		this.insertSwimmer = new InsertSwimmer();
		this.insertSwimResult = new InsertSwimResult();
		this.insertTeam = new InsertTeam();
	}

	swimMeet(meet: RawSwimMeet, userId: string) {
		return this.insertSwimMeet.insert(this.cacheDb, meet, userId);
	}

	swimEvent(
		event: RawSwimEventWithoutResults,
		userId: string,
		meetId: number | undefined,
	) {
		return this.insertSwimEvent.insert(this.cacheDb, event, userId, meetId);
	}

	swimResult(result: RawSwimResult, userId: string, eventId: number) {
		return this.insertSwimResult.insert(this.cacheDb, result, userId, eventId);
	}

	swimmer(
		swimmer: RawSwimmer,
		userId: string,
		meetId: number,
		eventId: number,
		resultId: number,
	) {
		return this.insertSwimmer.insert(
			this.cacheDb,
			swimmer,
			userId,
			meetId,
			eventId,
			resultId,
		);
	}

	team(
		team: RawSwimTeam,
		userId: string,
		meetId: number,
		eventId: number,
		resultId: number,
		swimmerId: number,
	) {
		return this.insertTeam.insert(
			this.cacheDb,
			team,
			userId,
			meetId,
			eventId,
			resultId,
			swimmerId,
		);
	}
}
