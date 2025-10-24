import { faker } from "@faker-js/faker";
import { isUndefined } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class NumberPropertyType extends BaseMetadataPropertyType {
	dbColumnType = "int(11)";

	declare _value: number;
	min: number = -1e6;
	max: number = 1e6;
	allowedComparators: string[] = ["=", "<>", "<", "<=", ">", ">="];

	constructor(inputs: MetadataTypeInputs) {
		const { min, max, ...rest } = inputs;
		super(rest);

		if (!isUndefined(min)) this.min = min;
		if (!isUndefined(max)) this.max = max;

		this.type = "number";
	}

	get value() {
		return this._value;
	}

	set value(v: number | string) {
		this._value = this.validateValue(v);
	}

	validateValue(v?: unknown): number {
		const { min, max, validate } = this;
		return isUndefined(min) || isUndefined(max)
			? validate.number(v)
			: validate.minMaxNumber(min, max, v);
	}

	get formattedValue() {
		return `${this.value}`;
	}

	setSeedData() {
		const { min, max } = this;
		this.value = faker.number.int({ min, max });
	}
}
