import { isString } from "@/server/utils";
import type { MetadataFilter } from "../../MetadataManager";
import { BaseSanitize } from "../../services/BaseSanitize";

export class Sanitize extends BaseSanitize {
	location(location?: string) {
		return this.optionalSanitizeString(location);
	}

	filters(filters?: MetadataFilter[]) {
		if (!filters) {
			return;
		}

		return filters.map((filter) => ({
			...filter,
			value: isString(filter.value)
				? this.sanitizeString(filter.value)
				: filter.value,
		}));
	}
}

export const SanitizeInstance = new Sanitize();
