import { faker } from "@faker-js/faker";
import type { Option } from "@/server/types";
import { isNotSet, isString, isUndefined } from "@/server/utils";
import type { OptionsTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class OptionsPropertyType extends BaseMetadataPropertyType {
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

		const joinedOptionKeys = options.map((option) => option.key).join("', '");
		this.dbColumnType = `ENUM('${joinedOptionKeys}')`;
		this.options = options;
		this.type = "options";

		if (!isUndefined(value)) this.value = value as string;
	}

	get value() {
		return this._value;
	}

	set value(v: string) {
		this._value = this.validateValue(v);
	}

	validateValue(v?: unknown): string {
		if (isNotSet(v) || !isString(v)) {
			throw Error("Invalid value. String expected");
		}

		const option = this.options.find((o) => o.key === v);
		if (!option) {
			throw Error("Value not in options");
		}

		return option.key;
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
		this.value = this.options[index].key;
	}
}
