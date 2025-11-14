import type {
	EntityType,
	MetadataFilter,
	PaginationOptions,
} from "@/server/types";

// Outputs
export type RawEntity = {
	id: number;
	name: string;
	type: EntityType;
	description?: string;
};

export type EntityLoadRelatedDataOptions = {
	loadUserCanEdit?: boolean;
	loadDefaultImage?: boolean;
};

// Inputs
export type RawGetAllEntityInputs = EntityLoadRelatedDataOptions &
	PaginationOptions & {
		entityType: EntityType;
		filters?: MetadataFilter[];
	};

export type RawFilterByEntityInputs = RawGetAllEntityInputs;

export type RawGetByIdsEntityInputs = EntityLoadRelatedDataOptions &
	PaginationOptions & {
		entityType: EntityType;
		entityIds: number[];
	};

export type RawGetByIdEntityInputs = EntityLoadRelatedDataOptions & {
	entityType: EntityType;
	entityId: number;
};

export type RawGetByNameEntityInputs = EntityLoadRelatedDataOptions & {
	entityType: EntityType;
	name: string;
};

export type RawUpdateEntityInputs = RawInsertEntityInputs & {
	entityId: number;
};

export type RawInsertEntityInputs = {
	entityType: EntityType;
	name: string;
	description?: string;
};

export type RawFindEntityInputs = RawInsertEntityInputs &
	EntityLoadRelatedDataOptions;

export type RawDeleteEntityInputs = {
	entityType: EntityType;
	entityId: number;
};

export type RawEntityInputs = {
	id?: number;
	name: string;
	description?: string;
};

export interface ILoadableEntity {
	loadDefaultImage: boolean;
	loadUserCanEdit: boolean;
}
