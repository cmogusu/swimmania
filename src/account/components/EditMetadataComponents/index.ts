import type { ReactNode } from "react";
import { childComponents } from "./childComponents";
import { EditParentType } from "./EditParentType";
import type { EditProps } from "./types";

type ComponentType = (props: EditProps) => ReactNode | null;

export const editMetadataComponents: Record<string, ComponentType> = {
	...childComponents,
	parent: EditParentType,
};
