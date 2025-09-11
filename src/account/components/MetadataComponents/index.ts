import { BooleanType } from "./BooleanType";
import { DateType } from "./DateType";
import { LatitudeType } from "./LatitudeType";
import { LongitudeType } from "./LongitudeType";
import { NoneType } from "./NoneType";
import { NumberType } from "./NumberType";
import { OptionsType } from "./OptionsType";
import { ParentType } from "./ParentType";
import { RatingsType } from "./RatingsType";
import { TextType } from "./TextType";
import { TimeType } from "./TimeType";

export const metadataTypeComponents = {
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
