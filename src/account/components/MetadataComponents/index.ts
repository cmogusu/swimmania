import { BooleanType, EditBooleanType } from "./BooleanType";
import { DateType } from "./DateType";
import { EditLatitudeType, LatitudeType } from "./LatitudeType";
import { EditLongitudeType, LongitudeType } from "./LongitudeType";
import { NoneType } from "./NoneType";
import { EditNumberType, NumberType } from "./NumberType";
import { OptionsType } from "./OptionsType";
import { ParentType } from "./ParentType";
import { EditRatingsType, RatingsType } from "./RatingsType";
import { TextType } from "./TextType";
import { TimeType } from "./TimeType";

export const metadataComponents = {
	none: NoneType,
	parent: ParentType,
	number: NumberType,
	ratings: RatingsType,
	boolean: BooleanType,
	options: OptionsType,
	text: TextType,
	latitude: LatitudeType,
	longitude: LongitudeType,
	time: TimeType,
	date: DateType,
};

export const editMetadataComponents = {
	none: NoneType,
	parent: ParentType,
	number: EditNumberType,
	ratings: EditRatingsType,
	boolean: EditBooleanType,
	options: OptionsType,
	text: TextType,
	latitude: EditLatitudeType,
	longitude: EditLongitudeType,
	time: TimeType,
	date: DateType,
};
