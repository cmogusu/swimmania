import type { EntityType, RelationshipType } from "@/server/types";
import type {
	RawDeleteEntityInputs,
	RawGetAllEntityInputs,
	RawInsertEntityInputs,
} from "../EntityManager";

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
