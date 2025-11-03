import type {
	EntityType,
	MetadataFilter,
	PaginationOptions,
} from "@/server/types";
import type { RawImageInputs } from "../ImageManager";

// Outputs
export type RawEntity = {
	id: number;
	name: string;
	type: EntityType;
	description?: string;
};

export type EntityLoadRelatedDataOptions = {
	loadImages?: boolean;
	loadDefaultImage?: boolean;
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
	images?: RawImageInputs[];
};

export type RawDeleteEntityInputs = {
	entityId: number;
};

export type RawEntityInputs = {
	id?: number;
	name: string;
	description?: string;
	images?: RawImageInputs[];
};

export interface ILoadableEntity {
	loadImages: boolean;
	loadDefaultImage: boolean;
}
