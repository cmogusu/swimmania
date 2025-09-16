import { EditTextType } from "./EditTextType";
import type { EditProps } from "./types";

export const EditTimeType = (props: EditProps) => {
	console.log("time");
	return <EditTextType {...props} inputType="time" />;
};
