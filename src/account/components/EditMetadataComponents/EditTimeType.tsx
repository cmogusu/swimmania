import { EditTextType } from "./EditTextType/EditTextType";
import type { EditProps } from "./types";

export const EditTimeType = (props: EditProps) => {
	return <EditTextType {...props} inputType="time" />;
};
