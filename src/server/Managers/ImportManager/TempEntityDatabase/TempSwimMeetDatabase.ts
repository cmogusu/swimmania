import type { RawSwimMeet } from "../types";
import { PROCESSING_STATE } from "./constants";
import { TempRawEntityDatabase } from "./TempRawEntityDatabase";

export class TempSwimMeetDatabase extends TempRawEntityDatabase<RawSwimMeet> {
	createRawEntityDataTable() {
		this.db.exec(`
      CREATE TABLE IF NOT EXISTS ${this.dbTable} (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT NOT NULL,
        description TEXT,
        location TEXT,
        isProcessed INTEGER NOT NULL DEFAULT ${PROCESSING_STATE.UNPROCESSED},
        failureCount INTEGER NOT NULL DEFAULT 0
      ) STRICT
    `);
	}

	insert(data: RawSwimMeet) {
		this.insertSingleRowRawData(data);
	}
}
