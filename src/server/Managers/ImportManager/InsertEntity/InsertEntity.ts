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

	swimEvent(event: RawSwimEventWithoutResults, meetId: number | undefined) {
		return this.insertSwimEvent.insert(this.cacheDb, event, meetId);
	}

	swimMeet(meet: RawSwimMeet) {
		return this.insertSwimMeet.insert(this.cacheDb, meet);
	}

	swimResult(result: RawSwimResult, eventId: number) {
		return this.insertSwimResult.insert(this.cacheDb, result, eventId);
	}

	swimmer(
		swimmer: RawSwimmer,
		meetId: number,
		eventId: number,
		resultId: number,
	) {
		return this.insertSwimmer.insert(
			this.cacheDb,
			swimmer,
			meetId,
			eventId,
			resultId,
		);
	}

	team(
		team: RawSwimTeam,
		meetId: number,
		eventId: number,
		resultId: number,
		swimmerId: number,
	) {
		return this.insertTeam.insert(
			this.cacheDb,
			team,
			meetId,
			eventId,
			resultId,
			swimmerId,
		);
	}
}
