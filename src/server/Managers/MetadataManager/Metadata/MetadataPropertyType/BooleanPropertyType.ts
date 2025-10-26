import { isSet } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class BooleanPropertyType extends BaseMetadataPropertyType {
	dbColumnType = "tinyint";

	declare _value: boolean;

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);

		this.type = "boolean";
		if (isSet(inputs.value)) this.value = inputs.value as boolean;
	}

	get value(): boolean {
		return this._value;
	}

	set value(v: boolean) {
		this._value = this.validateValue(v);
	}

	validateValue(v?: unknown): boolean {
		return this.validate.boolean(v);
	}

	setSeedData() {
		this.value = Math.random() > 0.5;
	}
}
