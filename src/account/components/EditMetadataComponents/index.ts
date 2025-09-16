import { childComponents } from "./childComponents";
import { EditParentType } from "./EditParentType";

export const editMetadataComponents = {
	...childComponents,
	parent: EditParentType,
};
