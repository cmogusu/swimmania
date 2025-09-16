import { EditTextType } from "./EditTextType";
import type { EditProps } from "./types";

export const EditDateType = (props: EditProps) => {
	return <EditTextType {...props} inputType="date" />;
};
