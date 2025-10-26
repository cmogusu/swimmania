import { faker } from "@faker-js/faker";
import { addLeadingZero, isSet } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { TextPropertyType } from "./TextPropertyType";

export class DatePropertyType extends TextPropertyType {
	dbColumnType = "date";

	declare _value: string;

	constructor(inputs: MetadataTypeInputs) {
		const { value, ...rest } = inputs;
		super(rest);

		this.type = "date";
		if (isSet(value)) this.value = value as string;
	}

	get value(): string {
		return this._value;
	}

	// Expected format is 2025-07-23
	set value(v: string) {
		this._value = this.validateValue(v);
	}

	validateValue(v?: unknown): string {
		const date = getDateString(v as string);
		return this.validate.date(date);
	}

	setSeedData() {
		const fakeDate = faker.date.anytime();
		this.value = getFormatedDateStrings(fakeDate);
	}
}

/**
 * The date from mysql is a Date instance while that from the client is a string. This returns string value
 */
const getDateString = (date: string | Date): string => {
	return date instanceof Date ? getFormatedDateStrings(date) : date;
};

const getFormatedDateStrings = (date: Date): string => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const dayDate = date.getDate();
	return `${year}-${addLeadingZero(month)}-${addLeadingZero(dayDate)}`;
};
