import * as z from "zod";
import { EntityTypesKeys, MAX_TEXT_LENGTH } from "@/server/constants";

export class BaseValidate {
	idValidator = z.number().positive();
	nameValidator = z.string().min(2).max(255);
	descriptionValidator = z.string().min(2).max(MAX_TEXT_LENGTH);
	entityTypeValidator = z.enum(EntityTypesKeys);
	ageValidator = z.number().positive().max(100);
	timeValidator = z.iso.time(); // Format: "03:15:00"
	dateValidator = z.iso.date(); // Format: "2020-01-01"
	genderValidator = z.enum(["male", "female"]);

	id(id?: number | string) {
		this.idValidator.parse(id);
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

	age(age: number) {
		this.ageValidator.parse(age);
	}

	time(time: string) {
		this.timeValidator.parse(time);
	}

	date(date: string) {
		this.dateValidator.parse(date);
	}

	gender(gender: string) {
		this.genderValidator.parse(gender);
	}
}
