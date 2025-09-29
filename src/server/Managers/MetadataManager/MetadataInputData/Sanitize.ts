import type { MetadataValue } from "../../../Managers/MetadataManager";
import { isString } from "../../../utils";
import { BaseSanitize } from "../../services/BaseSanitize";

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
