import { faker } from "@faker-js/faker";
import type { INumberMetadataPropertyType } from "@/server/types";
import { clamp, isUndefined } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class NumberPropertyType
	extends BaseMetadataPropertyType
	implements INumberMetadataPropertyType
{
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
		if (!isUndefined(inputs.value)) this.value = inputs.value as number;
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
			: validate.minMaxNumber(min, max, clamp(v, min, max)); // TODO: Remove this clamping. Its only needed for dev work.
	}

	get formattedValue() {
		return `${this.value}`;
	}

	setSeedData() {
		const { max } = this;
		this.value = faker.number.int({ max });
	}
}
