import { childComponents } from "./childComponents";
import { ParentType } from "./ParentType";

export const metadataComponents = {
	...childComponents,
	parent: ParentType,
};
