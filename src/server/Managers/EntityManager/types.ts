import type { EntityType, PaginationOptions } from "../../types";
import type { RawImageInputs } from "../ImageManager";
import type { MetadataFilter, RawMetadata } from "../MetadataManager";

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
export type RawGetAllEntityInputs = EntityLoadRelatedDataOptions &
	PaginationOptions & {
		filters?: MetadataFilter[];
	};

export type RawFilterByEntityInputs = RawGetAllEntityInputs;

export type RawGetByIdsEntityInputs = EntityLoadRelatedDataOptions &
	PaginationOptions & {
		entityIds: number[];
	};

export type RawGetByIdEntityInputs = EntityLoadRelatedDataOptions & {
	entityId: number;
};

export type RawGetByNameEntityInputs = EntityLoadRelatedDataOptions & {
	name: string;
};

export type RawUpdateEntityInputs = RawInsertEntityInputs & {
	entityId: number;
};

export type RawInsertEntityInputs = {
	name: string;
	description?: string;
	location?: string;
	images?: RawImageInputs[];
	metadata?: RawMetadata[];
};

export type RawDeleteEntityInputs = {
	entityId: number;
};

export type RawEntityInputs = {
	id?: number;
	name: string;
	description?: string;
	location?: string;
	images?: RawImageInputs[];
	metadata?: RawMetadata[];
};

export interface ILoadableEntity {
	loadImages: boolean;
	loadDefaultImage: boolean;
	loadMetadata: boolean;
}
