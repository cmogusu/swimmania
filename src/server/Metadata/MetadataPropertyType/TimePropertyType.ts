import { addLeadingZero, isNumber, isString } from "../../utils";
import type { MetadataTypeInputs, MetadataValue } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

const SUFFIX = " Hrs";

export class TimePropertyType extends BaseMetadataPropertyType {
	declare _value: number;

	constructor(inputs: MetadataTypeInputs) {
		super({
			...inputs,
			suffix: SUFFIX,
		});

		this.type = "time";
	}

	get value(): number {
		return this._value;
	}

	// Expected format is 08:30
	set value(v: string) {
		this.validateValue(v);
		this._value = this.sanitizeValue(v);
	}

	validateValue(v: MetadataValue): void {
		if (this.isStringTimeValue(v)) {
			this.validateStringTimeValue(v);
		} else {
			this.validateNumberValue(v as number);
		}
	}

	sanitizeValue(v: MetadataValue): number {
		return this.isStringTimeValue(v)
			? this.sanitizeStringTimeValue(v as string)
			: this.sanitizeNumberValue(v as number);
	}

	sanitizeNumberValue(v: number): number {
		return Number(v);
	}

	get formattedValue(): string {
		const date = new Date(this._value);
		const hours = date.getUTCHours();
		const minutes = date.getUTCMinutes();
		const formatedHours = addLeadingZero(hours);
		const formatedMinutes = addLeadingZero(minutes);
		const formatedTime = `${formatedHours}:${formatedMinutes}`;
		return formatedTime;
	}

	isStringTimeValue(v: MetadataValue) {
		return isString(v) && v.includes(":");
	}

	sanitizeStringTimeValue(v: string): number {
		const [hours, minutes] = v.split(":").map(Number);
		const date = new Date(0);
		date.setUTCHours(hours, minutes);
		return date.getTime();
	}

	validateNumberValue(v?: number) {
		if (!isNumber(v)) {
			throw "Invalid value. Number expected for time value";
		}
	}

	validateStringTimeValue(v?: unknown): void {
		if (!isString(v)) {
			throw "Invalid value. String expected for time";
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
}
