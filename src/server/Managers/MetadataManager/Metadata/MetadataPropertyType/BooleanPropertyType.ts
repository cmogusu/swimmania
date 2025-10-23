import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class BooleanPropertyType extends BaseMetadataPropertyType {
	dbColumnType = "tinyint";

	declare _value: number;

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);

		this.type = "boolean";
	}

	get value() {
		return this._value;
	}

	set value(v: number) {
		this._value = this.sanitizeValue(v);
	}

	sanitizeValue(v: boolean | number | string): number {
		return v ? 1 : 0;
	}

	setSeedData() {
		this.value = Math.random() > 0.5 ? 1 : 0;
	}
}
