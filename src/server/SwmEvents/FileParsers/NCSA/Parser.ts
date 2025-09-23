import { GalaEvent, SingleSwimmerEvent } from "../../EventData/";
import { EventTitleParser } from "./EventTitleParser";
import { SwimmerEntryResultParser } from "./SwimmerEntryResultParser";

export class Parser {
	eventTitleParser: EventTitleParser;
	swimmerEntryResultParser: SwimmerEntryResultParser;
	mostRecentEvent: GalaEvent | undefined;

	constructor() {
		this.eventTitleParser = new EventTitleParser();
		this.swimmerEntryResultParser = new SwimmerEntryResultParser();
	}

	parse(lineOfText: string) {
		const { swimmerEntryResultParser, eventTitleParser, mostRecentEvent } =
			this;
		if (swimmerEntryResultParser.test(lineOfText)) {
			const swimmerRawData = swimmerEntryResultParser.parse(lineOfText);
			return new SingleSwimmerEvent(swimmerRawData, mostRecentEvent);
		}

		if (eventTitleParser.test(lineOfText)) {
			const eventRawData = eventTitleParser.parse(lineOfText);
			this.mostRecentEvent = new GalaEvent(eventRawData);
			return this.mostRecentEvent;
		}

		return undefined;
	}
}
