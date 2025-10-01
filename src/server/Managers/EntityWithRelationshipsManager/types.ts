import type { EntityType } from "@/server/types";
import type {
	RawDeleteEntityInputs,
	RawEntityInputs,
	RawGetByIdEntityInputs,
	RawGetByNameEntityInputs,
	RawInsertEntityInputs,
	RawUpdateEntityInputs,
} from "../EntityManager";
import type { RelationshipType } from "../RelatedEntityManager";

// Output
export type Related = RawEntityInputs & {
	type: EntityType;
	relationshipType: RelationshipType;
};

export type RelatedArr = {
	related: Related[];
};

export type GetByIdEntityWithRelationsInput = RawGetByIdEntityInputs &
	RelatedArr;

export type GetByNameEntityWithRelationsInput = RawGetByNameEntityInputs &
	RelatedArr;

export type UpdateEntityWithRelationsInput = RawUpdateEntityInputs & RelatedArr;

export type InsertEntityWithRelationsInput = RawInsertEntityInputs & RelatedArr;

export type DeleteEntityWithRelationsInput = RawDeleteEntityInputs & RelatedArr;
