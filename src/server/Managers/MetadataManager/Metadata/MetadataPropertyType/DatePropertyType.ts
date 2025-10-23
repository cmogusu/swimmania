import { faker } from "@faker-js/faker";
import {
	addLeadingZero,
	isNumber,
	isString,
	isUndefined,
} from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { TimePropertyType } from "./TimePropertyType";
import { type Validate, ValidateInstance } from "./Validate";

// TODO: implement this
export class DatePropertyType extends TimePropertyType {
	dbColumnType = "date";
	validate: Validate;
	sanitize: Sanitize;

	declare _value: number;

	constructor(inputs: MetadataTypeInputs) {
		const { value, ...rest } = inputs;
		super(rest);

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
		this.type = "date";
		if (!isUndefined(value)) this.value = value as string;
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
