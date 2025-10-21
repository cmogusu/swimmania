import type { EntityType, RelationshipType } from "@/server/types";
import type {
	RawGetAllEntityInputs,
	RawInsertEntityInputs,
} from "../EntityManager";

// Inputs
export type RawGetRelatedEntityInputs = RawGetAllEntityInputs & {
	type: EntityType;
	relationshipType: RelationshipType;
};

export type RawInsertRelatedEntityInputs = {
	id: number;
	type: EntityType;
	relationshipType: RelationshipType;
};

export type RawInsertNewRelatedEntityInputs = RawInsertEntityInputs & {
	type: EntityType;
	relationshipType: RelationshipType;
};

export type RawDeleteRelatedEntityInputs = {
	id: number;
	type: EntityType;
	relationshipType: RelationshipType;
};
