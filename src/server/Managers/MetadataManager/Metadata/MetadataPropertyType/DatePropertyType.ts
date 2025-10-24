import { faker } from "@faker-js/faker";
import { addLeadingZero, isUndefined } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { TextPropertyType } from "./TextPropertyType";

export class DatePropertyType extends TextPropertyType {
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

	// Expected format is 2025-07-23
	set value(v: string) {
		this._value = this.validateValue(v);
	}

	validateValue(v?: unknown): string {
		return this.validate.date(v as string);
	}

	setSeedData() {
		const fakeDate = faker.date.anytime();
		const year = fakeDate.getFullYear();
		const month = fakeDate.getMonth() + 1;
		const date = fakeDate.getDate();
		this.value = `${year}-${addLeadingZero(month)}-${addLeadingZero(date)}`;
	}
}
