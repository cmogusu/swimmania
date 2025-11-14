import type { DatabaseSync } from "node:sqlite";
import { EventEmitter } from "node:stream";
import { EVENT } from "@/server/constants";
import type { EntityType } from "@/server/types";
import { SwimEventParser, SwimMeetParser } from "../FileParsers";
import {
	type TempSwimEventDatabase,
	type TempSwimMeetDatabase,
	tempEntityDatabaseFactory,
} from "../TempEntityDatabase";
import type {
	DbOutput,
	ITextParser,
	RawSwimEventWithResults,
	RawSwimMeet,
} from "../types";
import type { EntityInsertData } from "./types";

export class SwimResultsParser extends EventEmitter {
	tempSwimEventDb: TempSwimEventDatabase;
	tempSwimMeetDb: TempSwimMeetDatabase;

	swimMeetParser: ITextParser;
	swimEventParser: ITextParser;

	constructor(db: DatabaseSync) {
		super();

		this.swimMeetParser = new SwimMeetParser();
		this.tempSwimMeetDb = tempEntityDatabaseFactory.getInstance("swimMeet", db);
		this.registerListeners(
			"swimMeet",
			this.swimMeetParser,
			this.tempSwimMeetDb,
		);

		this.swimEventParser = new SwimEventParser();
		this.tempSwimEventDb = tempEntityDatabaseFactory.getInstance(
			"swimEvent",
			db,
		);
		this.registerListeners(
			"swimEvent",
			this.swimEventParser,
			this.tempSwimEventDb,
		);
	}

	parse(text: string) {
		const meetText = text.slice(0, 200);
		this.swimMeetParser.parse(meetText);
		this.swimEventParser.parse(text);
	}

	getMeetData() {
		return this.getData<RawSwimMeet>(this.tempSwimMeetDb);
	}

	getEventData() {
		return this.getData<RawSwimEventWithResults>(this.tempSwimEventDb);
	}

	getData<T>(
		tempDb: TempSwimEventDatabase | TempSwimMeetDatabase,
	): EntityInsertData<T> | undefined {
		const data = tempDb.getUnprocessed() as unknown as DbOutput<T>;
		if (!data) {
			return;
		}

		tempDb.setIsProcessing(data.id); // TODO: Move this into db class
		const onComplete = (isProcessingSuccessful: boolean) => {
			if (isProcessingSuccessful) {
				tempDb.setProcessed(data.id);
			} else {
				tempDb.setProcessingFailure(data.id);
			}
		};

		return { data, onComplete };
	}

	registerListeners(
		entityType: EntityType,
		parser: ITextParser,
		tempDb: TempSwimEventDatabase | TempSwimMeetDatabase,
	) {
		parser.on(EVENT.DATA, (data: unknown) => {
			// @ts-ignore
			tempDb.insert(data);
			this.emit(EVENT.DATA_READY, entityType);
		});
	}
}
