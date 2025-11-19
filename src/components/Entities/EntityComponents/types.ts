import type { PropsWithChildren } from "react";
import type { EntityData, EntityType, RawMetadata } from "@/server/types";

export type EntityProps = PropsWithChildren & {
	entity: EntityData;
	entityType: EntityType;
};

export type MetadataProps = {
	entityId: number;
	metadata: RawMetadata;
};
