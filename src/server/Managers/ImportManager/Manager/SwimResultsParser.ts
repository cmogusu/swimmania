import type { DatabaseSync } from "node:sqlite";
import { SwimEventParser } from "../FileParsers";
import {
	type RawEntityDatabase,
	RawSwimEventDatabase,
	RawSwimMeetDatabase,
} from "../RawEntityDatabase";
import type { RawSwimEventWithResults, RawSwimMeet } from "../types";

export class SwimResultsParser {
	db: DatabaseSync;

	constructor(db: DatabaseSync) {
		this.db = db;
	}

	parseSwimMeet(text: string): RawEntityDatabase<RawSwimMeet> {
		return this.parse<RawSwimMeet>(new RawSwimMeetDatabase(this.db), text);
	}

	parseSwimEvent(text: string): RawEntityDatabase<RawSwimEventWithResults> {
		return this.parse<RawSwimEventWithResults>(
			new RawSwimEventDatabase(this.db),
			text,
		);
	}

	parse<OutputType>(rawEntityDb: RawEntityDatabase<OutputType>, text: string) {
		const hasData = rawEntityDb.getWasDataEnded();
		if (hasData) {
			return rawEntityDb;
		}

		const parser = new SwimEventParser(rawEntityDb);
		parser.parse(text);
		return rawEntityDb;
	}
}
