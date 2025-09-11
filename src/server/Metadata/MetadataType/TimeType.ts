import { addLeadingZero, isNumber, isString } from "../../utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataType } from "./BaseMetadataType";

const SUFFIX = " Hrs";

export class TimeType extends BaseMetadataType {
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
		this.hasValue = true;
		if (this.parent) this.parent.hasValue = true;
	}

	validateValue(v?: unknown): void {
		if (!isNumber(v)) {
			throw "Invalid value. Number expected for time value";
		}
	}

	sanitizeValue(v: string): number {
		return Number(v);
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

	sanitizeStringTimeValue(v: string): number {
		const [hours, minutes] = v.split(":").map(Number);
		const date = new Date(0);
		date.setUTCHours(hours, minutes);
		return date.getTime();
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
