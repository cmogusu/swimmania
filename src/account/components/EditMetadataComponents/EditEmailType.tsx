import { EditTextType } from "./EditTextType/EditTextType";
import type { EditProps } from "./types";

export const EditEmailType = (props: EditProps) => {
	return <EditTextType {...props} inputType="email" />;
};
