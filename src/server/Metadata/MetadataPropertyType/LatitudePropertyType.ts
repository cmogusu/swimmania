import { faker } from "@faker-js/faker";
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

	setSeedData() {
		this.value = faker.location.latitude({
			max: -1.1,
			min: -1.3,
			precision: 14,
		});
	}
}
