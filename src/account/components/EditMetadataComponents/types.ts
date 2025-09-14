import type { EntityType, IMetadataType } from "@/server";

export type EditProps = {
	entityType: EntityType;
	entityId: number;
	metadataType: IMetadataType;
};
