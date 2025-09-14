import type { JSX } from "react";
import { BooleanType } from "./BooleanType";
import { DateType } from "./DateType";
import { LatitudeType } from "./LatitudeType";
import { LongitudeType } from "./LongitudeType";
import { NumberType } from "./NumberType";
import { OptionsType } from "./OptionsType";
import { RatingsType } from "./RatingsType";
import { TextType } from "./TextType";
import { TimeType } from "./TimeType";
import type { MetadataTypeProps } from "./types";

type ComponentType = (props: MetadataTypeProps) => JSX.Element | null;

export const childComponents: Record<string, ComponentType> = {
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
