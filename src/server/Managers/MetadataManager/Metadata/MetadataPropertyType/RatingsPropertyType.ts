import { faker } from "@faker-js/faker";
import type { MetadataTypeInputs } from "../types";
import { NumberPropertyType } from "./NumberPropertyType";

const MIN_VALUE = 1;
const MAX_VALUE = 5;

export class RatingsPropertyType extends NumberPropertyType {
	declare _value: number;

	constructor(inputs: MetadataTypeInputs) {
		super({
			...inputs,
			min: MIN_VALUE,
			max: MAX_VALUE,
		});

		this.type = "ratings";
	}

	setSeedData() {
		const { min, max } = this;
		this.value = faker.number.int({ min, max });
	}
}
