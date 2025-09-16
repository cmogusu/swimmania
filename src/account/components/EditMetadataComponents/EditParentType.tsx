import { isUndefined } from "@/server";
import { childComponents } from "./childComponents";
import type { EditProps } from "./types";

export const EditParentType = ({
	entityType,
	entityId,
	metadataType,
}: EditProps) => {
	const { children, title } = metadataType;
	const childrenWithValues = children?.filter((child) => child.hasValue);

	if (isUndefined(childrenWithValues?.[0])) {
		return null;
	}

	const firstChild = childrenWithValues[0];
	const Component = childComponents[firstChild.type];

	return (
		<Component
			entityType={entityType}
			entityId={entityId}
			metadataType={firstChild}
			childrenMetadata={childrenWithValues}
			parentTitle={title}
		/>
	);
};
