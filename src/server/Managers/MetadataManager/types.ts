import type { EntityType, PaginationOptions } from "../../types";
import type { MetadataFilter, MetadataValue } from "./Metadata/";

// Inputs
export type RawGetAllMetadataInputs = PaginationOptions & {
	entityType: EntityType;
	entityId: number;
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
	name: string;
	value?: MetadataValue;
	itemIndex?: number;
};

export type RawDeleteMetadataInputs = {
	id: number;
	entityId: number;
};

export type RawFilterByMetadataInputs = PaginationOptions & {
	entityType: EntityType;
	filters: MetadataFilter[];
};
