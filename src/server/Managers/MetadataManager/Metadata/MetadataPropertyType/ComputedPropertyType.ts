// TODO - Implement this

import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class ComputedPropertyType extends BaseMetadataPropertyType {
	declare _value: number;

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);
		this.type = "number";
	}

	get value() {
		return this._value;
	}

	set value(v: number | string) {
		this._value = this.validateValue(v);
	}

	validateValue(v?: unknown) {
		return Number(v);
	}

	get formattedValue() {
		return `${this.value}`;
	}

	setSeedData() {}
}
