import type { ReactNode } from "react";
import { entityMetadataFactory } from "@/server/Managers";
import type {
	EntityType,
	IMetadataPropertyType,
	RawMetadata,
} from "@/server/types";
import { childComponents } from "./childComponents";
import { ParentType } from "./ParentType";
import type { MetadataTypeProps } from "./types";

type ComponentType = (props: MetadataTypeProps) => ReactNode | null;

export const metadataComponents: Record<string, ComponentType> = {
	...childComponents,
	parent: ParentType,
};

export const getMetadataComponents = (
	entityType: EntityType,
	metadata: RawMetadata | undefined,
) => {
	const entityMetadata = metadata?.length
		? entityMetadataFactory.getInstance(entityType, metadata)
		: null;

	if (!entityMetadata) {
		return undefined;
	}

	return entityMetadata.metadata.map((metadataType: IMetadataPropertyType) => {
		const { name, type } = metadataType;
		const MetadataComponent = metadataComponents[type];
		return <MetadataComponent key={name} metadataType={metadataType} />;
	});
};
