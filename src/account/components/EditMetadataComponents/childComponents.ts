import type { ReactNode } from "react";
import { EditBooleanType } from "./EditBooleanType";
import { EditDateTimeType } from "./EditDateTimeType";
import { EditDateType } from "./EditDateType";
import { EditEmailType } from "./EditEmailType";
import { EditLatitudeType } from "./EditLatitudeType";
import { EditLongitudeType } from "./EditLongitudeType";
import { EditNumberType } from "./EditNumberType";
import { EditOptionsType } from "./EditOptionsType";
import { EditRatingsType } from "./EditRatingsType";
import { EditTextType } from "./EditTextType/EditTextType";
import { EditTimeType } from "./EditTimeType";
import type { EditProps } from "./types";

type ComponentType = (props: EditProps) => ReactNode | null;

export const childComponents: Record<string, ComponentType> = {
	number: EditNumberType,
	ratings: EditRatingsType,
	boolean: EditBooleanType,
	options: EditOptionsType,
	text: EditTextType,
	latitude: EditLatitudeType,
	longitude: EditLongitudeType,
	time: EditTimeType,
	date: EditDateType,
	dateTime: EditDateTimeType,
	email: EditEmailType,
};
