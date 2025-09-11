import { isNull, isNumber, isUndefined } from "../../../utils";
import { BaseValidate } from "../../services/BaseValidate";

export class Validate extends BaseValidate {
	value(v?: unknown) {
		if (isNull(v) || isUndefined(v)) {
			throw Error("value not set");
		}
	}

	itemIndex(v?: unknown) {
		if (!isNumber(v)) {
			throw Error("Value not number");
		}
	}
}

export const ValidateInstance = new Validate();
