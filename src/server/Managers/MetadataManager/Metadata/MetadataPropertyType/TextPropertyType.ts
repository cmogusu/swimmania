import { faker } from "@faker-js/faker";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class TextPropertyType extends BaseMetadataPropertyType {
	dbColumnType: string = "varchar(255)";

	declare _value: string;

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);

		this.type = "text";
	}

	get value() {
		return this._value;
	}

	set value(v: string) {
		this._value = this.validateValue(v);
	}

	validateValue(v?: unknown): string {
		return this.validate.string(v);
	}

	setSeedData() {
		this.value = faker.word.words({ count: { min: 1, max: 2 } });
	}
}
