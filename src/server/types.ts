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

export type RelationshipType =
	| "isAlso"
	| "worksAt"
	| "worksAt_inverse"
	| "trainsAt"
	| "trainsAt_inverse"
	| "canBeFoundAt"
	| "canBeFoundAt_inverse"
	| "manages"
	| "manages_inverse"
	| "contains"
	| "contains_inverse"
	| "participatedIn"
	| "participatedIn_inverse"
	| "parentOf"
	| "parentOf_inverse";

export type SchemaType =
	| "parent"
	| "number"
	| "ratings"
	| "boolean"
	| "options"
	| "text"
	| "latitude"
	| "longitude"
	| "time"
	| "date";

export type RawMetadata = {
	id?: number;
	name: string;
	value?: MetadataValue;
	entityType?: EntityType;
	entityId?: number;
	itemIndex?: number;
};

export type MetadataComparator = "=" | "!=" | "<" | "<=" | ">" | ">=";

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
	type: EntityType;
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

export type RelationshipTypeDescription = {
	getTitle: (relatedEntityType: EntityType) => string;
	description: string;
};

export type RelatedEntityRelationship = [RelationshipType, EntityType];
