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
	thirdName: string | undefined;
	age: number;
	team: string | undefined;
	time: string;
};

export type SwimEventResult = Omit<RawSwimEvent, "results"> & RawSwimResult;
