import { isNotSet, isString, sanitizeTextForDb } from "../../utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class TextPropertyType extends BaseMetadataPropertyType {
	declare _value: string;

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);

		this.type = "text";
	}

	get value() {
		return this._value;
	}

	set value(v: string) {
		this.validateValue(v);
		this._value = v;
	}

	validateValue(v?: unknown): void {
		if (isNotSet(v) || !isString(v)) {
			throw Error("Invalid value. String expected");
		}
	}

	sanitizeValue(v: string): string {
		return sanitizeTextForDb(v);
	}
}
