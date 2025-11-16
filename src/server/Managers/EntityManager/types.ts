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

export type UserId = {
	userId: string;
};

// Inputs
export type RawGetAllEntityInputs = EntityLoadRelatedDataOptions &
	Partial<UserId> &
	PaginationOptions & {
		entityType: EntityType;
		filters?: MetadataFilter[];
	};

export type RawFilterByEntityInputs = RawGetAllEntityInputs;

export type RawGetByIdsEntityInputs = EntityLoadRelatedDataOptions &
	Partial<UserId> &
	PaginationOptions & {
		entityType: EntityType;
		entityIds: number[];
	};

export type RawGetByIdEntityInputs = EntityLoadRelatedDataOptions &
	Partial<UserId> & {
		entityType: EntityType;
		entityId: number;
	};

export type RawGetByNameEntityInputs = EntityLoadRelatedDataOptions &
	Partial<UserId> & {
		entityType: EntityType;
		name: string;
	};

export type RawInsertEntityInputs = UserId & {
	entityType: EntityType;
	name: string;
	description?: string;
};

export type RawUpdateEntityInputs = RawInsertEntityInputs & {
	entityId: number;
};

export type RawFindEntityInputs = EntityLoadRelatedDataOptions &
	Partial<UserId> & {
		entityType: EntityType;
		name: string;
		description?: string;
	};

export type RawDeleteEntityInputs = UserId & {
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
