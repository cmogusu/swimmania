import { isBoolean, isNotSet } from "../../utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataType } from "./BaseMetadataType";

export class BooleanType extends BaseMetadataType {
	declare _value: boolean;

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);

		this.type = "boolean";
	}

	get value() {
		return this._value;
	}

	set value(v: boolean) {
		this.validateValue(v);
		this._value = this.sanitizeValue(v);
		this.hasValue = true;
		if (this.parent) this.parent.hasValue = true;
	}

	validateValue(v?: unknown) {
		if (isNotSet(v) || !isBoolean(v)) {
			throw Error("Invalid value. Boolean expected");
		}
	}

	sanitizeValue(v: boolean | number | string): boolean {
		return Boolean(v);
	}
}
