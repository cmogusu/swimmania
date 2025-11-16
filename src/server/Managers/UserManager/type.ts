import type { EntityType } from "@/server/types";

type BaseAccessInputs = {
	entityType: EntityType;
	entityId: number;
};

export type RawGrantLoggedInUserAccessInputs = BaseAccessInputs;

export type RawRevokeLoggedInUserAccessInputs = BaseAccessInputs;

export type RawGrantAccessInputs = BaseAccessInputs & {
	userId: string;
};

export type RawRevokeAccessInputs = BaseAccessInputs & {
	userId: string;
};
