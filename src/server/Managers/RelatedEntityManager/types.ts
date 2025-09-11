import type { EntityType } from "../../types";

export type RelatedEntityRawInputData = {
	entityType: string;
	entityId: number;
	relatedEntityType: EntityType;
	relatedEntityId?: number;
};

export type RelatedEntityDatabaseRawOutputData =
	Required<RelatedEntityRawInputData>;

export type RelatedEntityDatabaseOutputData =
	RelatedEntityDatabaseRawOutputData;

export type RelatedEntityValueType = boolean | number | string;
