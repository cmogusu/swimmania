import { faker } from "@faker-js/faker";
import { isNumber } from "@/server/utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataPropertyType } from "./BaseMetadataPropertyType";

export class NumberPropertyType extends BaseMetadataPropertyType {
	declare _value: number;

	allowedComparators: string[] = ["=", "<>", "<", "<=", ">", ">="];

	constructor(inputs: MetadataTypeInputs) {
		super(inputs);
		this.type = "number";
	}

	get value() {
		return this._value;
	}

	set value(v: number | string) {
		this.validateValue(v);
		this._value = this.sanitizeValue(v);
	}

	validateValue(v?: unknown): void {
		if (!isNumber(v)) {
			throw Error("Invalid value. Number value expected");
		}

		const value = Number(v);
		if (value > this.max || value < this.min) {
			throw Error("Value out of permitted range");
		}
	}

	sanitizeValue(v: number | string): number {
		return Number(v);
	}

	get formattedValue() {
		return `${this.value}`;
	}

	setSeedData() {
		const max = Math.min(this.max, 100);
		this.value = faker.number.int({ max });
	}
}
