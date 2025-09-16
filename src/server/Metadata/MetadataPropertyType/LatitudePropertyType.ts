import type { MetadataTypeInputs } from "../types";
import { NumberPropertyType } from "./NumberPropertyType";

const MIN_VALUE = -90;
const MAX_VALUE = 90;
const SUFFIX = "°";

export class LatitudePropertyType extends NumberPropertyType {
	constructor(inputs: MetadataTypeInputs) {
		super({
			...inputs,
			min: MIN_VALUE,
			max: MAX_VALUE,
			suffix: SUFFIX,
		});

		this.type = "latitude";
	}
}
