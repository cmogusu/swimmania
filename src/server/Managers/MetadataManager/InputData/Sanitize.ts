import { BaseSanitize } from "@/server/Managers/services/BaseSanitize";
import type { MetadataValue } from "@/server/types";
import { isString } from "@/server/utils";

export class Sanitize extends BaseSanitize {
	value(v?: MetadataValue) {
		return isString(v) ? this.sanitizeString(v) : v;
	}

	type(v: string) {
		return this.sanitizeString(v);
	}
}

export const SanitizeInstance = new Sanitize();
