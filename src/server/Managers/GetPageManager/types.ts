import type {
	EntityType,
	PaginationOptions,
	RawMetadata,
	UserId,
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
export type RawGetEntitiesInputs = PaginationOptions & {
	entityType: EntityType;
};

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

export type RawDbEntities = RawMetadata & {
	id: number;
	entityName: string;
	entityDescription: string | undefined;
	imageAlt: string | undefined;
	imageFilePath: string | undefined;
};
