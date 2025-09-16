import type { MetadataTypeInputs } from "../types";
import { NumberPropertyType } from "./NumberPropertyType";

const MIN_VALUE = -180;
const MAX_VALUE = 180;
const SUFFIX = "°";

export class LongitudePropertyType extends NumberPropertyType {
	constructor(inputs: MetadataTypeInputs) {
		super({
			...inputs,
			min: MIN_VALUE,
			max: MAX_VALUE,
			suffix: SUFFIX,
		});

		this.type = "longitude";
	}
}
