import type { RawSwimMeet } from "../types";
import { TempRawEntityDatabase } from "./TempRawEntityDatabase";

export class TempSwimMeetDatabase extends TempRawEntityDatabase {
	createRawEntityDataTable() {
		this.db.exec(`
      CREATE TABLE IF NOT EXISTS ${this.dbTable} (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT NOT NULL,
        description TEXT,
        location TEXT,
        isProcessed INTEGER NOT NULL DEFAULT 0
      ) STRICT
    `);
	}

	insertRawData(data: RawSwimMeet) {
		this.insertSingleRowRawData(data);
	}
}
