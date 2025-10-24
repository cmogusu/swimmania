import { faker } from "@faker-js/faker";
import { isUndefined } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { TimePropertyType } from "./TimePropertyType";

export class DatePropertyType extends TimePropertyType {
	dbColumnType = "date";

	declare _value: string;

	constructor(inputs: MetadataTypeInputs) {
		const { value, ...rest } = inputs;
		super(rest);

		this.type = "date";
		if (!isUndefined(value)) this.value = value as string;
	}

	get value(): string {
		return this._value;
	}

	// Expected format is 08:30
	set value(v: string) {
		this._value = this.validateValue(v);
	}

	validateValue(v?: unknown): string {
		return this.validate.date(v as string);
	}

	setSeedData() {
		this.value = faker.date.anytime().toUTCString();
	}
}
