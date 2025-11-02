import { EditTextType } from "./EditTextType/EditTextType";
import type { EditProps } from "./types";

export const EditDateTimeType = (props: EditProps) => {
	return <EditTextType {...props} inputType="datetime-local" step={1} />;
};
