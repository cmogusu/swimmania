import type { JSX } from "react";
import { EditBooleanType } from "./EditBooleanType";
import { EditDateType } from "./EditDateType";
import { EditLatitudeType } from "./EditLatitudeType";
import { EditLongitudeType } from "./EditLongitudeType";
import { EditNumberType } from "./EditNumberType";
import { EditOptionsType } from "./EditOptionsType";
import { EditRatingsType } from "./EditRatingsType";
import { EditTextType } from "./EditTextType/EditTextType";
import { EditTimeType } from "./EditTimeType";
import type { EditProps } from "./types";

type ComponentType = (props: EditProps) => JSX.Element | null;

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
};
