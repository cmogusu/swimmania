import { isString } from "@/server/utils";
import { BaseSanitize } from "../../services/BaseSanitize";
import type { MetadataValue } from "../types";

export class Sanitize extends BaseSanitize {
	value(v?: MetadataValue) {
		if (isString(v)) {
			return this.sanitizeString(v);
		}

		return v;
	}
}

export const SanitizeInstance = new Sanitize();
