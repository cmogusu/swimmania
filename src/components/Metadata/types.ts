import type { IMetadataPropertyType } from "@/server";

export type MetadataTypeProps = {
	parentTitle?: string;
	childrenMetadata?: IMetadataPropertyType[];
	metadataType: IMetadataPropertyType;
};
