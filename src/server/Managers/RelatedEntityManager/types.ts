import type { EntityType, RelationshipType } from "@/server/types";
import type { RawGetAllEntityInputs } from "../EntityManager";

// Inputs
export type RawGetRelatedEntityInputs = Pick<
	RawGetAllEntityInputs,
	"filters"
> & {
	type: EntityType;
	relationshipType: RelationshipType;
};

export type RawInsertRelatedEntityInputs = {
	id: number;
	type: EntityType;
	relationshipType: RelationshipType;
};

export type RawDeleteRelatedEntityInputs = {
	id: number;
	type: EntityType;
	relationshipType: RelationshipType;
};
