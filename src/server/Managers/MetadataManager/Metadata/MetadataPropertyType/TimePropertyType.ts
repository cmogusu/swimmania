import { faker } from "@faker-js/faker";
import type { ITimeMetadataPropertyType, MetadataValue } from "@/server/types";
import { addLeadingZero, isSet, isUndefined } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

const SUFFIX = " Hrs";

export class TimePropertyType
	extends BaseMetadataPropertyType
	implements ITimeMetadataPropertyType
{
	dbColumnType: string = "time";
	step: number = 1;

	declare _value: string;

	constructor(inputs: MetadataTypeInputs) {
		const { value, step, ...rest } = inputs;
		super({
			...rest,
			suffix: SUFFIX,
		});

		this.type = "time";
		if (!isUndefined(step)) this.step = step;
		if (isSet(value)) this.value = value as string;
	}

	get value(): string {
		return this._value;
	}

	// Expected format is 08:30:58
	set value(v: string) {
		if (v) {
			this._value = this.validateValue(v);
		}
	}

	validateValue(v: MetadataValue): string {
		return this.validate.time(v as string);
	}

	setSeedData() {
		const date = faker.date.anytime();
		const hours = date.getUTCHours();
		const minutes = date.getUTCMinutes();
		const seconds = date.getUTCSeconds();
		this.value = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
	}
}
