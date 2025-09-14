import { isUndefined } from "@/server";
import { childComponents } from "./childComponents";
import type { MetadataTypeProps } from "./types";

export const ParentType = ({ metadataType }: MetadataTypeProps) => {
	const { children, title } = metadataType;
	const childrenWithValues = children?.filter((child) => child.hasValue);

	if (isUndefined(childrenWithValues?.[0])) {
		return null;
	}

	const firstChild = childrenWithValues[0];
	const Component = childComponents[firstChild.type];

	return (
		<Component
			parentTitle={title}
			metadataType={firstChild}
			childrenMetadata={childrenWithValues}
		/>
	);
};
