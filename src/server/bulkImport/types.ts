import type { SwimEventData, SwimResultData } from "./InputData";

export type SwimResultRawData = {
	position: string;
	swimmerName: string;
	seedTime: string;
	finalsTime: string;
	team: string;
	ageGroup: string;
};

export type SwimEventRawData = {
	eventNumber: string;
	sex: string;
	swimDistance: string;
	swimStroke: string;
};

export interface ILineTypeParser {
	test: (lineOfText: string) => boolean;
	parse: (
		lineOfText: string,
	) => SwimResultRawData | SwimEventRawData | undefined;
}

export interface ILineParser {
	parse: (lineOfText: string) => SwimResultData | SwimEventData | undefined;
}
