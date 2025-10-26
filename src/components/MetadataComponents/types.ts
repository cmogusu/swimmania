import type { IMetadataPropertyType } from "@/server/types";

export type MetadataTypeProps = {
	parentTitle?: string;
	childrenMetadata?: IMetadataPropertyType[];
	metadataType: IMetadataPropertyType;
};
