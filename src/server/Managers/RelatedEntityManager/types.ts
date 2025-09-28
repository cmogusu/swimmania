import type { EntityType } from "../../types";

// Input
export type RawRelatedEntityInputData = {
	entityType: EntityType;
	entityId: number;
	relatedEntityType: EntityType;
	relatedEntityId?: number;
};

export type RawGetRelatedInputData = {
	entityType: EntityType;
	entityId: number;
	relatedEntityType: EntityType;
};

export type RawGetNonRelatedInputData = RawGetRelatedInputData;

// Output
export type RelatedEntityDatabaseRawOutputData =
	Required<RawRelatedEntityInputData>;

export type RelatedEntityDatabaseOutputData =
	RelatedEntityDatabaseRawOutputData;

export type RelatedEntityValueType = boolean | number | string;

export type RelationshipType =
	| "isAlso"
	| "worksAt"
	| "trainsAt"
	| "canBeFoundAt"
	| "manages"
	| "contains"
	| "participatedIn";

export type RelationshipDescription = {
	title: string;
	description: string;
};
