import type { MetadataTypeInputs } from "../types";
import { NumberType } from "./NumberType";

const MIN_VALUE = 1;
const MAX_VALUE = 5;

export class RatingsType extends NumberType {
	declare _value: number;

	constructor(inputs: MetadataTypeInputs) {
		super({
			...inputs,
			min: MIN_VALUE,
			max: MAX_VALUE,
		});

		this.type = "ratings";
	}
}
