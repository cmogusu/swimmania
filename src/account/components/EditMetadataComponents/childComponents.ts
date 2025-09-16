import { EditBooleanType } from "./EditBooleanType";
import { EditDateType } from "./EditDateType";
import { EditLatitudeType } from "./EditLatitudeType";
import { EditLongitudeType } from "./EditLongitudeType";
import { EditNumberType } from "./EditNumberType";
import { EditOptionsType } from "./EditOptionsType";
import { EditRatingsType } from "./EditRatingsType";
import { EditTextType } from "./EditTextType";
import { EditTimeType } from "./EditTimeType";

export const childComponents = {
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
