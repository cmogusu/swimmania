import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class BooleanPropertyType extends BaseMetadataPropertyType {
	declare _value: boolean;

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);

		this.type = "boolean";
	}

	get value() {
		return this._value;
	}

	set value(v: boolean) {
		this._value = this.sanitizeValue(v);
	}

	sanitizeValue(v: boolean | number | string): boolean {
		return Boolean(v);
	}
}
