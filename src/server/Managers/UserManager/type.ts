import type { EntityType } from "@/server/types";

export type RawGrantAccessInputs = {
	entityType: EntityType;
	entityId: number;
};

export type RawRevokeAccessInputs = RawGrantAccessInputs;
