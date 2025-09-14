import { EditTextType } from "./EditTextType";
import type { EditProps } from "./types";

export const EditNumberType = (props: EditProps) => {
	return <EditTextType {...props} inputType="date" />;
};
