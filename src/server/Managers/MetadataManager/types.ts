import type { EntityType } from "../../types";
import type { MetadataFilter, MetadataValue } from "./Metadata/";

// Inputs
export type RawGetAllMetadataInputs = {
	entityType: EntityType;
	entityId: number;
	pageSize: number;
	pageNumber: number;
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

export type RawFilterByMetadataInputs = {
	entityType: EntityType;
	filters: MetadataFilter[];
};

export type MetadataRawInputs = {
	id?: number;
	name?: string;
	value?: MetadataValue;
	entityType?: EntityType;
	entityId?: number;
	itemIndex?: number;
	filters?: MetadataFilter[];
};
