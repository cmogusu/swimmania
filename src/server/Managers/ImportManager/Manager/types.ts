export type MeetData = {
	name: string;
	subtitle: string;
	date: string;
};

export type EventData = {
	event_number: number;
	gender: string;
	age_group: string;
	distance: string;
	results: ResultData[];
};

export type ResultData = {
	rank: number;
	name: string;
	age: number;
	team: string;
	time: string;
};

export interface ImportManager {
	importJson: (fileName: string) => Promise<void>;
}
