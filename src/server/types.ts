import type { MetadataValue } from "./Managers/MetadataManager";

export type EntityType =
	| "coach"
	| "lifeguard"
	| "swimmer"
	| "parent"
	| "team"
	| "pool"
	| "school"
	| "swimMeet"
	| "swimEvent"
	| "swimResult";

export type PaginationOptions = {
	pageNumber?: number;
	pageSize?: number;
};

export interface IPaginated {
	pageNumber: number;
	pageSize: number;
}

export type ImageData = {
	id: number;
	alt: string;
	src: string;
	isDefault: boolean;
};

export type MetadataData = {
	id: number;
	name: string;
	value: MetadataValue;
};

export type EntityData = {
	id: number;
	type: string;
	name: string;
	description: string | undefined;
	location: string | undefined;
	defaultImage: ImageData | undefined;
	images: ImageData[] | undefined;
	metadata: MetadataData[] | undefined;
	relationshipType?: string;
};

export type EntitiesData = {
	nextPage: number;
	entities: EntityData[];
	hasMore: boolean;
};

export type EntityRequest = {
	defaultImage: "";
	images: [];
	metadata: [];
	related: ["pool", "school"];
};
