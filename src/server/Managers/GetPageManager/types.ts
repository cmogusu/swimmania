import type {
	EntityType,
	PaginationOptions,
	RawMetadata,
} from "@/server/types";

// Inputs
export type RawGetEntitiesInputs = PaginationOptions & {
	entityType: EntityType;
};

export type RawGetMeetResultsInputs = {
	meetId: number;
};

export type RawEntityInputs = {
	id?: number;
	name: string;
	description?: string;
};

export type RawDbEntities = RawMetadata & {
	id: number;
	entityName: string;
	entityDescription: string | undefined;
	imageAlt: string | undefined;
	imageFilePath: string | undefined;
};
