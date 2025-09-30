export type RawSwimResult = {
	eventNumber: number;
	gender: string;
	team: string;
	distance: string;
	distanceUnit: string;
	stroke: string;
	id: number | undefined;
	rank: number;
	firstName: string;
	surname: string;
	thirdName: string | undefined;
	age: number | undefined;
	ageGroup: string;
	time: string;
};

// Inputs
export type RawUpdateSwmResultInputs = {
	id: number;
};
