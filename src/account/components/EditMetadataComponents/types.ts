import type { EntityType, IMetadataPropertyType } from "@/server/types";

export type EditProps = {
	entityType: EntityType;
	entityId: number;
	metadataType: IMetadataPropertyType;
	childrenMetadata?: IMetadataPropertyType[];
	parentTitle?: string;
};
