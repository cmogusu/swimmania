import type { IParentMetadataPropertyType } from "@/server/types";
import { childComponents } from "./childComponents";
import type { EditProps } from "./types";

export const EditParentType = ({
	entityType,
	entityId,
	metadataType,
}: EditProps) => {
	const { children, title } = metadataType as IParentMetadataPropertyType;

	if (!children?.[0]) {
		throw Error("Parent has no children");
	}

	const firstChild = children[0];
	const Component = childComponents[firstChild.type];

	return (
		<Component
			entityType={entityType}
			entityId={entityId}
			metadataType={firstChild}
			childrenMetadata={children}
			parentTitle={title}
		/>
	);
};
