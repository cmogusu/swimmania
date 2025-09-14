import type { IMetadataType } from "@/server";

export type MetadataTypeProps = {
	parentTitle?: string;
	childrenMetadata?: IMetadataType[];
	metadataType: IMetadataType;
};
