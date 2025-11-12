import { SwimEventData, SwimResultData } from "../InputData";
import type { ILineParser } from "../types";
import { SwimEventParser } from "./SwimEventParser";
import { SwimResultParser } from "./SwimResultParser";

export class Parser implements ILineParser {
	swimResultParser: SwimResultParser;
	swimEventParser: SwimEventParser;

	prevSwimResult: SwimResultData | undefined;
	prevSwimEvent: SwimEventData | undefined;

	constructor() {
		this.swimResultParser = new SwimResultParser();
		this.swimEventParser = new SwimEventParser();
	}

	parse(lineOfText: string) {
		const { swimEventParser, swimResultParser } = this;

		if (swimResultParser.test(lineOfText)) {
			const rawSwimResultData = swimResultParser.parse(lineOfText);
			this.prevSwimResult = new SwimResultData(
				rawSwimResultData,
				this.prevSwimEvent,
			);

			return this.prevSwimResult;
		}

		if (swimEventParser.test(lineOfText)) {
			const rawSwimEventData = swimEventParser.parse(lineOfText);
			this.prevSwimEvent = new SwimEventData(rawSwimEventData);
			return this.prevSwimEvent;
		}

		return undefined;
	}
}
