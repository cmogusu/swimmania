import { faker } from "@faker-js/faker";
import { isSet } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { NumberPropertyType } from "./NumberPropertyType";

const MIN_VALUE = -180;
const MAX_VALUE = 180;
const SUFFIX = "°";

export class LongitudePropertyType extends NumberPropertyType {
	dbColumnType = "double";

	constructor(inputs: MetadataTypeInputs) {
		super({
			...inputs,
			min: MIN_VALUE,
			max: MAX_VALUE,
			suffix: SUFFIX,
		});

		this.type = "longitude";
		if (isSet(inputs.value)) this.value = inputs.value as number;
	}

	setSeedData() {
		this.value = faker.location.longitude({
			max: 36.9,
			min: 36.7,
			precision: 15,
		});
	}
}
