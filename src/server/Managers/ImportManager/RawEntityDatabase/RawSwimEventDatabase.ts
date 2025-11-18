import type { DatabaseSync } from "node:sqlite";
import { EVENT } from "@/server/constants";
import type { RawSwimEvent, RawSwimEventWithResults } from "../types";
import { PROCESSING_STATE } from "./constants";
import { RawEntityDatabase } from "./RawEntityDatabase";

export class RawSwimEventDatabase extends RawEntityDatabase<RawSwimEventWithResults> {
	constructor(db: DatabaseSync) {
		super(db, "swimEvent");
	}

	createRawEntityDataTable() {
		this.db.exec(`
      CREATE TABLE IF NOT EXISTS ${this.dbTable} (
        id INTEGER PRIMARY KEY,
        eventNumber INTEGER NOT NULL,
        gender TEXT NOT NULL,
        team TEXT NOT NULL,
        distance TEXT NOT NULL,
        distanceUnit TEXT NOT NULL,
        stroke TEXT NOT NULL,
        rank INTEGER NOT NULL,
        firstName TEXT NOT NULL,
        surname TEXT NOT NULL,
        thirdName TEXT DEFAULT NULL,
        age INTEGER DEFAULT NULL,
        ageGroup TEXT NOT NULL,
        time TEXT NOT NULL,
        isProcessed INTEGER NOT NULL DEFAULT ${PROCESSING_STATE.UNPROCESSED},
        failureCount INTEGER NOT NULL DEFAULT 0
      ) STRICT
    `);
	}

	insert(data: RawSwimEvent) {
		const { results: swimResults, ...swimEvent } = data;
		const swimEventResults = swimResults.map((swimResult) => ({
			...swimEvent,
			...swimResult,
		}));

		swimEventResults.forEach((swimEventResult: RawSwimEventWithResults) => {
			this.insertSingleRowRawData(swimEventResult);
		});

		this.emit(EVENT.DATA);
	}
}
