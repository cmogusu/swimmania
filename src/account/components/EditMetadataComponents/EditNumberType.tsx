import { EditTextType } from "./EditTextType/EditTextType";
import type { EditProps } from "./types";

export const EditNumberType = (props: EditProps) => {
	return <EditTextType {...props} inputType="number" />;
};
