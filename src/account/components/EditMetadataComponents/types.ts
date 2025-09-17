import type { EntityType, IMetadataPropertyType } from "@/server";

export type EditProps = {
	entityType: EntityType;
	entityId: number;
	metadataType: IMetadataPropertyType;
	childrenMetadata?: IMetadataPropertyType[];
	parentTitle?: string;
};
