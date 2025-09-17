import { EditTextType } from "./EditTextType/EditTextType";
import type { EditProps } from "./types";

export const EditTimeType = (props: EditProps) => {
	const { name, value, formattedValue } = props.metadataType;
	console.log(name, value, formattedValue);
	return <EditTextType {...props} inputType="time" />;
};
