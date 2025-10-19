import type { EntityType } from "@/server/types";
import type {
	RawDeleteEntityInputs,
	RawGetAllEntityInputs,
	RawInsertEntityInputs,
} from "../EntityManager";
import type { RelationshipType } from "../RelatedEntityIdManager";

// Inputs
export type RawGetRelatedEntityInputs = RawGetAllEntityInputs & {
	type: EntityType;
	relationshipType: RelationshipType;
};

export type RawInsertRelatedEntityInputs = RawInsertEntityInputs & {
	entityId?: number;
	type: EntityType;
	relationshipType: RelationshipType;
};

export type RawDeleteRelatedEntityInputs = RawDeleteEntityInputs & {
	type: EntityType;
	relationshipType: RelationshipType;
};
