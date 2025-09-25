export type RawSwimResult = {
	id: number | undefined;
	rank: number;
	firstName: string;
	surname: string;
	thirdName: string | undefined;
	age: number | undefined;
	ageGroup: string;
	time: number;
};

// Inputs
export type RawSetProcessedSwmResultInputs = {
	id: number;
};
