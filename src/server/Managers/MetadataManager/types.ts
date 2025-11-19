import type {
	EntityType,
	MetadataFilter,
	PaginationOptions,
	RawMetadata,
} from "@/server/types";

// Inputs
export type RawGetAllMetadataInputs = PaginationOptions & {
	entityType: EntityType;
	entityId: number;
};

export type RawGetListMetadataInputs = PaginationOptions & {
	entityType: EntityType;
	entityId: number;
	names: string[];
};

export type RawGetByIdMetadataInputs = {
	entityType: EntityType;
	id: number;
	entityId: number;
};

export type RawUpdateMetadataInputs = RawInsertMetadataInputs;

export type RawInsertEmptyMetadataInputs = {
	entityType: EntityType;
	entityId: number;
};

export type RawInsertMetadataInputs = {
	entityType: EntityType;
	entityId: number;
	rawMetadata: RawMetadata;
};

export type RawDeleteMetadataInputs = {
	entityId: number;
	entityType: EntityType;
};

export type RawFilterByMetadataInputs = PaginationOptions & {
	entityType: EntityType;
	filters: MetadataFilter[];
};
