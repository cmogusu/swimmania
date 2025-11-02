import { faker } from "@faker-js/faker";
import { isSet } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class EmailPropertyType extends BaseMetadataPropertyType {
	dbColumnType: string = "varchar(255)";

	declare _value: string;

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);

		this.type = "email";
		if (isSet(inputs.value)) this.value = inputs.value as string;
	}

	get value() {
		return this._value;
	}

	set value(v: string) {
		this._value = this.validateValue(v);
	}

	validateValue(v?: string): string {
		return this.validate.email(v);
	}

	setSeedData() {
		this.value = faker.word.words({ count: { min: 1, max: 2 } });
	}
}
