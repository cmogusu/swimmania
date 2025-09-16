import { isNotSet, isString, isUndefined } from "../../utils";
import type { Option, OptionsTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class OptionsPropertyType extends BaseMetadataPropertyType {
	declare _value: string;
	options: Option[] = [];

	constructor(inputs: OptionsTypeInputs) {
		super(inputs);

		this.type = "options";
		this.setOptions(inputs.options);
	}

	setOptions(options?: Option[]) {
		if (!options) {
			throw Error("Options not set");
		}

		this.options = options;
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

		const lowerCaseValue = v.toLowerCase();
		const option = this.options.find((o) => o.key === lowerCaseValue);
		if (!option) {
			throw Error("Value not in options");
		}
	}

	sanitizeValue(v: string): string {
		return v.toLowerCase();
	}

	get formattedValue(): string {
		const { options, value } = this;
		if (isUndefined(value)) {
			return "";
		}

		const option = options.find((o) => o.key === value);
		return option?.value ?? "";
	}
}
