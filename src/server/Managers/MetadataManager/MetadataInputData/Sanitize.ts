import type { MetadataValue } from "../../../Metadata";
import { isString } from "../../../utils";
import { BaseSanitize } from "../../services/BaseSanitize";

export class Sanitize extends BaseSanitize {
	value(v?: MetadataValue) {
		if (isString(v)) {
			return this.sanitizeString(v);
		}

		return v;
	}

	itemIndex(v?: number): number {
		return v || 0;
	}
}

export const SanitizeInstance = new Sanitize();
