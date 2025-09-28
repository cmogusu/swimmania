import type { MetadataFilter } from "@/server/Managers/MetadataManager";
import { BaseValidate } from "@/server/Managers/services/BaseValidate";
import { isArray } from "@/server/utils";

export class Validate extends BaseValidate {
	id(id?: number | string) {
		if (id === undefined || Number.isNaN(id)) {
			throw Error("Id not set");
		}
	}

	// TODO - Implement validation
	location() {}

	filters(filters?: MetadataFilter[]) {
		if (!filters || !isArray(filters) || !filters.length) {
			throw Error("filters not set");
		}
	}
}

export const ValidateInstance = new Validate();
