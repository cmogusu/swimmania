import * as z from "zod";
import { EntityTypesKeys, MAX_TEXT_LENGTH } from "@/server/constants";

export class BaseValidate {
	idValidator = z.number().positive();
	nameValidator = z.string().min(2).max(255);
	descriptionValidator = z.string().min(2).max(MAX_TEXT_LENGTH);
	entityTypeValidator = z.enum(EntityTypesKeys);

	id(id?: number | string) {
		this.idValidator.parse(id);
		if (id === undefined || Number.isNaN(id)) {
			throw Error("Id not set");
		}
	}

	name(name?: string) {
		this.nameValidator.parse(name);
	}

	description(description?: string) {
		if (description) {
			this.descriptionValidator.parse(description);
		}
	}

	entityType(entityType?: string) {
		this.entityTypeValidator.parse(entityType);
	}
}
