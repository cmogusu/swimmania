export type SingleEventRawData = {
	position: string;
	swimmerName: string;
	seedTime: string;
	finalsTime: string;
	team: string;
	ageGroup: string;
};

export type GalaEventRawData = {
	eventNumber: string;
	sex: string;
	swimDistance: string;
	swimStroke: string;
};

export interface IEventData {
	save: () => void;
}

export interface ILineParser {
	test: (lineOfText: string) => boolean;
	parse: (
		lineOfText: string,
	) => SingleEventRawData | GalaEventRawData | undefined;
}

export interface IFileParser {
	parse: () => void;
}
