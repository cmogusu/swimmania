import { isNumber } from "../../utils";
import type { MetadataTypeInputs } from "../types";
import { BaseMetadataType } from "./BaseMetadataType";

export class NumberType extends BaseMetadataType {
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
		this.hasValue = true;
		if (this.parent) this.parent.hasValue = true;
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
}
