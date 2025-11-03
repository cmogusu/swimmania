import type {
	EntityType,
	IMetadataPropertyType,
	IParentMetadataPropertyType,
} from "@/server/types";

export type EditProps = {
	entityType: EntityType;
	entityId: number;
	metadataType: IMetadataPropertyType;
	parentMetadata?: IParentMetadataPropertyType;
	childrenMetadata?: IMetadataPropertyType[];
	parentTitle?: string;
};
