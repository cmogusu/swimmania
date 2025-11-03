import type {
	EntityType,
	PaginationOptions,
	RelationshipType,
} from "../../types";

// Input
export type BaseRelatedData = {
	entityType: EntityType;
	entityId: number;
	relatedEntityType: EntityType;
};

export type RawRelatedEntityInputData = BaseRelatedData & {
	relatedEntityId?: number;
	relationshipType?: RelationshipType;
};

export type RawHasRelationshipData = BaseRelatedData & {
	relatedEntityId: number;
	relationshipType: RelationshipType;
};

export type RawGetRelatedInputData = BaseRelatedData &
	PaginationOptions & {
		relationshipType: RelationshipType;
	};

export type RawInsertRelatedInputData = BaseRelatedData & {
	relatedEntityId: number;
	relationshipType: RelationshipType;
};

export type RawDeleteByIdRelatedInputData = BaseRelatedData & {
	relatedEntityId: number;
	relationshipType: RelationshipType;
};

export type RawDeleteRelatedInputData = RawGetRelatedInputData & {
	relatedEntityId: number;
};

export type RawDeleteAllRelatedInputData = {
	entityId: number;
};

export type RawGetNonRelatedInputData = RawGetRelatedInputData;

// Output
export type RelatedEntityDatabaseRawOutputData =
	Required<RawRelatedEntityInputData>;

export type RelatedEntityDatabaseOutputData =
	RelatedEntityDatabaseRawOutputData;

export type RelatedEntityValueType = boolean | number | string;
