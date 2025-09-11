import { isNotSet, isString, sanitizeTextForDb } from "../../utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataType } from "./BaseMetadataType";

export class TextType extends BaseMetadataType {
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
		this.hasValue = true;
		if (this.parent) this.parent.hasValue = true;
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
