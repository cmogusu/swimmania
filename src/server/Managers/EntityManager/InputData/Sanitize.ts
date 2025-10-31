import type { MetadataFilter } from "@/server/types";
import { isString } from "@/server/utils";
import { BaseSanitize } from "../../services/BaseSanitize";

export class Sanitize extends BaseSanitize {
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
