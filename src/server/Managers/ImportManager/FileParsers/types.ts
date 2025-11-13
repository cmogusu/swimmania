export type RawSwimMeet = {
	name: string;
	startDate: string;
	endDate: string;
	description?: string;
	location?: string;
};

export type RawSwimEvent = {
	eventNumber: number;
	stroke:
		| "freestyle"
		| "butterfly"
		| "breaststroke"
		| "breaststroke"
		| "individual_medley"
		| "freestyle_relay"
		| "medley_relay";
	distance: string;
	distanceUnit: "meter" | "yard";
	gender: "male" | "female" | "mixed";
	ageGroup: string;
	results: RawSwimResult[];
};

export type RawSwimResult = {
	rank: number;
	surname: string;
	firstName: string;
	thirdName?: string;
	age: number;
	team?: string;
	time: string;
};

export type SwimEventResult = Omit<RawSwimEvent, "results"> & RawSwimResult;
