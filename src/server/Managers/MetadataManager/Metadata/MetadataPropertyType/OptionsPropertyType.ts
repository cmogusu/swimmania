import { faker } from "@faker-js/faker";
import { isNotSet, isString, isUndefined } from "@/server/utils";
import type { Option, OptionsTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class OptionsPropertyType extends BaseMetadataPropertyType {
	// TODO: replace with enum eg dbColumnType = ENUM('available', 'out_of_stock', 'discontinued')
	dbColumnType = "varchar(255)";

	declare _value: string;
	options: Option[] = [];

	constructor(inputs: OptionsTypeInputs) {
		super({
			...inputs,
			value: undefined, // Avoid setting value until options are set
		});

		const { value, options } = inputs;
		if (!options) {
			throw Error("Options not set");
		}

		this.options = options;
		this.type = "options";
		if (!isUndefined(value)) this.value = value as string;
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

	setSeedData() {
		const max = this.options.length - 1;
		const index = faker.number.int({ max });
		this.value = this.options[index].value;
	}
}
