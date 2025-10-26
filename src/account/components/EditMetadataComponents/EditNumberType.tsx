import type { INumberMetadataPropertyType } from "@/server/types";
import { EditTextType } from "./EditTextType/EditTextType";
import type { EditProps } from "./types";

export const EditNumberType = (props: EditProps) => {
	const { min, max } = props.metadataType as INumberMetadataPropertyType;
	return <EditTextType {...props} inputType="number" min={min} max={max} />;
};
