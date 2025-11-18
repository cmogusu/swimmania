import type { DatabaseSync } from "node:sqlite";
import { SwimEventParser, SwimMeetParser } from "../FileParsers";
import {
	type RawEntityDatabase,
	RawSwimEventDatabase,
	RawSwimMeetDatabase,
} from "../RawEntityDatabase";
import type {
	ITextParser,
	RawSwimEventWithResults,
	RawSwimMeet,
} from "../types";

export class SwimResultsParser {
	db: DatabaseSync;

	constructor(db: DatabaseSync) {
		this.db = db;
	}

	parseSwimMeet(text: string): RawEntityDatabase<RawSwimMeet> {
		const rawEntityDb = new RawSwimMeetDatabase(this.db);
		return this.parse<RawSwimMeet>(
			rawEntityDb,
			new SwimMeetParser(rawEntityDb),
			text,
		);
	}

	parseSwimEvent(text: string): RawEntityDatabase<RawSwimEventWithResults> {
		const rawEntityDb = new RawSwimEventDatabase(this.db);
		return this.parse<RawSwimEventWithResults>(
			rawEntityDb,
			new SwimEventParser(rawEntityDb),
			text,
		);
	}

	parse<OutputType>(
		rawEntityDb: RawEntityDatabase<OutputType>,
		parser: ITextParser,
		text: string,
	) {
		const hasData = rawEntityDb.getWasDataEnded();
		console.log("***", { hasData });
		if (hasData) {
			return rawEntityDb;
		}

		parser.parse(text);
		return rawEntityDb;
	}
}
