import type { MetadataTypeInputs } from "../types";
import { NumberType } from "./NumberType";

const MIN_VALUE = -90;
const MAX_VALUE = 90;
const SUFFIX = "°";

export class LatitudeType extends NumberType {
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
