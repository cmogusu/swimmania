import type { IParentMetadataPropertyType } from "@/server/types";
import { childComponents } from "./childComponents";
import type { MetadataTypeProps } from "./types";

export const ParentType = ({ metadataType }: MetadataTypeProps) => {
	const { children, title } = metadataType as IParentMetadataPropertyType;

	if (!children?.[0]) {
		return null;
	}

	const [firstChild] = children;
	const Component = childComponents[firstChild.type];

	return (
		<Component
			parentTitle={title}
			metadataType={firstChild}
			childrenMetadata={children}
		/>
	);
};
