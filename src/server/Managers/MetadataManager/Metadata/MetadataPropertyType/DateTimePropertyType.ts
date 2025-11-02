import { faker } from "@faker-js/faker";
import type { ITimeMetadataPropertyType } from "@/server/types";
import { isSet, isUndefined } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

const SUFFIX = " Hrs";

export class DateTimePropertyType
	extends BaseMetadataPropertyType
	implements ITimeMetadataPropertyType
{
	dbColumnType: string = "datetime";
	step: number = 1;

	declare _value: string;

	constructor(inputs: MetadataTypeInputs) {
		const { value, step, ...rest } = inputs;
		super({
			...rest,
			suffix: SUFFIX,
		});

		this.type = "dateTime";
		if (!isUndefined(step)) this.step = step;
		if (isSet(value)) this.value = value as string;
	}

	get value(): string {
		return this._value;
	}

	// Expected format is 2025-11-12 15:55:58
	set value(v: string) {
		if (v) {
			// TODO: fix validation
			// this._value = this.validateValue(v);
			this._value = typeof v === "object" ? (v as Date).toISOString() : v;
		}
	}

	validateValue(v: string): string {
		const val = typeof v === "object" ? (v as Date).toISOString() : v;
		return this.validate.dateTime(val);
	}

	setSeedData() {
		const date = faker.date.anytime();
		this.value = date.toISOString().replace("T", " ").replace("Z", "");
	}
}
