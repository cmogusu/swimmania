import type { MetadataValue } from "../Metadata";

export type EntityType =
	| "coach"
	| "event"
	| "pool"
	| "school"
	| "swimmer"
	| "team";

export type PaginationOptions = {
	pageNumber?: number;
	pageSize?: number;
};

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
};
