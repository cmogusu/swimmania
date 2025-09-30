import type { MetadataValue } from "@/server/Managers/MetadataManager";
import { BaseSanitize } from "@/server/Managers/services/BaseSanitize";
import { isString } from "@/server/utils";

export class Sanitize extends BaseSanitize {
	value(v?: MetadataValue) {
		return isString(v) ? this.sanitizeString(v) : v;
	}

	type(v: string) {
		return this.sanitizeString(v);
	}

	itemIndex(v?: number): number {
		return v ? Number(v) : 0;
	}
}

export const SanitizeInstance = new Sanitize();
