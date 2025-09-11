import { isNull, isUndefined } from "@/server/utils";
import { BaseValidate } from "../../services/BaseValidate";

export class Validate extends BaseValidate {
	value(v?: unknown) {
		if (isNull(v) || isUndefined(v)) {
			throw Error("value not set");
		}
	}
}

export const ValidateInstance = new Validate();
