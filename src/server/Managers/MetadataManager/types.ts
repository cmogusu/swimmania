import type { EntityType, PaginationOptions, RawMetadata } from "../../types";
import type { MetadataFilter } from "./Metadata/";

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

export type RawUpdateMetadataInputs = RawInsertMetadataInputs & {
	id: number;
};

export type RawInsertMetadataInputs = {
	entityType: EntityType;
	entityId: number;
	rawMetadataArr: RawMetadata[];
};

export type RawDeleteMetadataInputs = {
	id: number;
	entityId: number;
	entityType: EntityType;
};

export type RawFilterByMetadataInputs = PaginationOptions & {
	entityType: EntityType;
	filters: MetadataFilter[];
};
