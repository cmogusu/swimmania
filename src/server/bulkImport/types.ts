import type { SwimEventData, SwimResultData } from "./InputData";

export type SwimResultRawData = {
	rank: string;
	swimmerName: string;
	seedTime: string;
	finalsTime: string;
	team: string;
	ageGroup: string;
};

export type SwimEventRawData = {
	eventNumber: string;
	swimStroke: string;
	swimDistance: string;
	gender: string;
	ageGroup: string;
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

export type RawMeetResultsData = {
	event: RawSwmMeetData;
	results: RawSwimEventData[];
};

export type RawSwmMeetData = {
	name: string;
	subtitle: string;
	date: string;
};

export type RawSwimEventData = {
	event_number: number;
	gender: string;
	age_group: string;
	distance: string;
	results: RawSwimResultData[];
};

export type RawSwimResultData = {
	rank: number;
	name: string;
	age: number;
	team: string;
	time: string;
};
