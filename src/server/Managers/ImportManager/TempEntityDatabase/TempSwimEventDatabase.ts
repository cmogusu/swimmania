import type { RawSwimEvent, RawSwimEventResult } from "../types";
import { TempRawEntityDatabase } from "./TempRawEntityDatabase";

export class TempSwimEventDatabase extends TempRawEntityDatabase {
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
        isProcessed INTEGER NOT NULL DEFAULT 0
      ) STRICT
    `);
	}

	insertRawData(data: RawSwimEvent) {
		const { results: swimResults, ...swimEvent } = data;
		const swimEventResults = swimResults.map((swimResult) => ({
			...swimEvent,
			...swimResult,
		}));

		swimEventResults.forEach((swimEventResult: RawSwimEventResult) => {
			this.insertSingleRowRawData(swimEventResult);
		});
	}
}
