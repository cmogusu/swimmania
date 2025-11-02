import * as z from "zod";
import { EntityTypesKeys, MAX_TEXT_LENGTH } from "@/server/constants";
import type { EntityType } from "@/server/types";

export class BaseValidate {
	idValidator = z.coerce
		.number("Number expected")
		.positive("Positive number expected");

	idsValidator = z.array(this.idValidator);
	nameValidator = z.string().min(2, "Too short").max(255, "Too long");
	emailValidator = z.email();
	descriptionValidator = z
		.string()
		.min(2, "Too short")
		.max(MAX_TEXT_LENGTH, "Too long");

	entityTypeValidator = z.enum(EntityTypesKeys);
	genderValidator = z.enum(["male", "female"]);
	ageValidator = z.coerce
		.number("Number expected")
		.positive("Positive number expected")
		.max(100, "Too long");

	timeValidator = z.iso.time("Invalid time"); // Format: "03:15:00"
	dateValidator = z.iso.date("Invalid date"); // Format: "2020-01-01"
	dateTimeValidator = z.iso.datetime({
		local: true,
		message: "Invalid datetime",
	}); // Format 2025-11-12 15:55:58

	booleanValidator = z.coerce.boolean("Invalid boolean");
	numberValidator = z.coerce.number("Invalid number");
	stringValidator = z.coerce.string("Invalid string");

	id(id?: number | string) {
		return this.idValidator.parse(id);
	}

	ids(ids?: number[]) {
		return this.idsValidator.parse(ids);
	}

	name(name?: string) {
		return this.nameValidator.parse(name);
	}

	email(email?: string) {
		return this.emailValidator.parse(email);
	}

	boolean(bool?: unknown) {
		return this.booleanValidator.parse(bool);
	}

	number(num?: unknown): number {
		return this.numberValidator.parse(num);
	}

	string(str?: unknown): string {
		return this.stringValidator.parse(str);
	}

	description(description?: string) {
		return this.descriptionValidator.parse(description);
	}

	entityType(entityType?: string) {
		return this.entityTypeValidator.parse(entityType) as EntityType;
	}

	age(age: number): number {
		return this.ageValidator.parse(age);
	}

	time(time: string): string {
		return this.timeValidator.parse(time);
	}

	date(date: string): string {
		return this.dateValidator.parse(date);
	}

	dateTime(dateTime: string): string {
		return this.dateTimeValidator.parse(dateTime);
	}

	gender(gender: string): string {
		return this.genderValidator.parse(gender);
	}

	validate(name: string, value: unknown) {
		const method = (this as Record<string, unknown>)[name];
		if (!method || typeof method !== "function") {
			throw Error("Invalid property name");
		}

		try {
			(method as (arg: unknown) => void).call(this, value);
		} catch (error: unknown) {
			return (error as z.ZodError).issues
				.map((issue) => issue.message)
				.join(", ");
		}
	}
}
