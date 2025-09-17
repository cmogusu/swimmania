import type { MetadataFilter, MetadataValue } from "../../Metadata/types";
import type { EntityType } from "../../types";

// Inputs
export type MetadataGetAllRawInputs = {
	entityType: EntityType;
	entityId: number;
};

export type MetadataGetByIdRawInputs = {
	entityType: EntityType;
	id: number;
	entityId: number;
};

export type MetadataUpdateRawInputs = MetadataPostRawInputs & {
	id: number;
};

export type MetadataPostRawInputs = {
	entityType: EntityType;
	entityId: number;
	name: string;
	value?: MetadataValue;
	itemIndex?: number;
};

export type MetadataDeleteRawInputs = {
	id: number;
	entityId: number;
};

export type MetadataFilterByRawInputs = {
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
