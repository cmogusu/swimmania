import type { EntityType, PaginationOptions } from "../../types";
import type { RawImageInputs } from "../ImageManager";
import type { MetadataFilter, RawMetadata } from "../MetadataManager";
import type { RelationshipType } from "../RelatedEntityManager";

// Outputs
export type RawEntity = {
	id: number;
	name: string;
	type: EntityType;
	description?: string;
	location?: string;
};

export type EntityLoadRelatedDataOptions = {
	loadImages?: boolean;
	loadDefaultImage?: boolean;
	loadMetadata?: boolean;
};

// Inputs
export type EntityGetAllRawInputs = EntityLoadRelatedDataOptions &
	PaginationOptions & {
		filters?: MetadataFilter[];
	};

export type EntityFilterByRawInputs = EntityLoadRelatedDataOptions &
	PaginationOptions & {
		filters: MetadataFilter[];
	};

export type EntityGetByIdsRawInputs = EntityLoadRelatedDataOptions &
	PaginationOptions & {
		entityIds: number[];
	};

export type EntityGetByIdRawInputs = EntityLoadRelatedDataOptions & {
	entityId: number;
};

export type EntityGetByNameRawInputs = EntityLoadRelatedDataOptions & {
	name: string;
};

export type EntityUpdateRawInputs = EntityPostRawInputs & {
	entityId: number;
};

export type EntityPostRawInputs = {
	name: string;
	description?: string;
	location?: string;
	images?: RawImageInputs[];
	metadata?: RawMetadata[];
	related?: RawRelatedEntity[];
};

export type EntityDeleteRawInputs = {
	entityId: number;
};

export type EntryRawInputs = PaginationOptions & {
	entityId?: number;
	entityIds?: number[];

	name?: string;
	description?: string;
	location?: string;

	loadImages?: boolean;
	loadDefaultImage?: boolean;
	loadMetadata?: boolean;

	filters?: MetadataFilter[];
};

export type RawRelatedEntity = EntityPostRawInputs & {
	type: EntityType;
	relationshipType: RelationshipType;
};
