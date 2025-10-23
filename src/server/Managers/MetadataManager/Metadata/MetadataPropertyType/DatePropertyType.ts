import { faker } from "@faker-js/faker";
import { addLeadingZero, isNumber, isString } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { TimePropertyType } from "./TimePropertyType";

// TODO: implement this
export class DatePropertyType extends TimePropertyType {
	dbColumnType = "date";

	declare _value: number;

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);

		this.type = "date";
	}

	get value(): number {
		return this._value;
	}

	// Expected format is 08:30
	set value(v: string) {
		this.validateValue(v);
		this._value = this.sanitizeValue(v);
	}

	validateValue(v?: unknown): void {
		this.validate.date(v as string);
	}

	sanitizeValue(v: string): number {
		const [hours, minutes] = v.split(":").map(Number);
		const date = new Date(0);
		date.setUTCHours(hours, minutes);
		return date.getTime();
	}

	get formattedValue(): string {
		const date = new Date(this._value);
		const hours = date.getUTCHours();
		const minutes = date.getUTCMinutes();
		const formatedHours = addLeadingZero(hours);
		const formatedMinutes = addLeadingZero(minutes);
		const formatedTime = `${formatedHours}:${formatedMinutes}`;
		return `${this.prefix}${formatedTime}${this.suffix}`;
	}

	stringTimeToValue(v?: unknown): void {
		if (!isString(v)) {
			throw "Invalid value. String expected for date value";
		}

		const [hours, minutes] = v.split(":");
		if (!hours || !minutes || !isNumber(hours) || !isNumber(minutes)) {
			throw "Invalid format. HH:MM format expected";
		}

		const hoursInt = Number(hours);
		if (hoursInt < 0 || hoursInt > 23) {
			throw "Invalid hour set";
		}

		const minutesInt = Number(minutes);
		if (minutesInt < 0 || minutesInt > 59) {
			throw "Invalid minute set";
		}
	}

	setSeedData() {
		this.value = faker.date.anytime().toUTCString();
	}
}
