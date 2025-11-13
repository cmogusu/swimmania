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

export type RawSwimResult = {
	rank: number;
	surname: string;
	firstName: string;
	thirdName?: string;
	age: number;
	team?: string;
	time: string;
};

export type RawSwimEventResult = Omit<RawSwimEvent, "results"> & RawSwimResult;

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
	getAllRawData(): unknown[];
	getUnprocessed(): unknown;
	insertRawData(_data: unknown): void;
	setProcessed(id: number): void;
	deleteTable(): void;
}
