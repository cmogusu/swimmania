import { EntityTypes } from "@/server/constants";

const MAX_TEXT_LENGTH = 3000;

export class BaseValidate {
	id(id?: number | string) {
		if (id === undefined || Number.isNaN(id)) {
			throw Error("Id not set");
		}
	}

	name(name?: string) {
		if (!name) {
			throw Error("Entity name not set");
		}
	}

	description(description?: string) {
		if (description && description.length > MAX_TEXT_LENGTH) {
			throw Error("Entity description too long");
		}
	}

	entityType(entityType?: string) {
		if (!entityType) {
			throw Error("Entity type not set");
		}

		if (!(entityType in EntityTypes)) {
			throw Error("Invalid value of entityType set");
		}
	}
}
