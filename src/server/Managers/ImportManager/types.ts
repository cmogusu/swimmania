import type { EntityType } from "@/server/types";

export type RawImportData = {
	file: File;
};

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
export type RawSwimEventWithoutResults = Omit<RawSwimEvent, "results">;

export type RawSwimmer = {
	surname: string;
	firstName: string;
	thirdName?: string;
	age: number;
};

export type RawSwimTeam = {
	team?: string;
};

export type RawSwimResult = RawSwimmer &
	RawSwimTeam & {
		rank: number;
		time: string;
	};

export type RawSwimEventWithResults = RawSwimEventWithoutResults &
	RawSwimResult;

export interface ITextParser {
	parse: (text: string) => void;
	on: (event: string, fn: (data: unknown) => void) => void;
}

export type TempDatabaseEntityTypes = Extract<
	EntityType,
	"swimEvent" | "swimMeet"
>;

export interface ITempEntityDatabase {
	getByName(entityType: EntityType, name: string): number;
	insert(entityType: EntityType, entityId: number, name: string): void;
}

export interface ITempRawEntityDatabase {
	getAll(): unknown[];
	getUnprocessed(): unknown;
	insert(_data: unknown): void;
	setProcessed(id: number): void;
	deleteTable(): void;
}

export type DbOutput<T> = T & { id: number };
