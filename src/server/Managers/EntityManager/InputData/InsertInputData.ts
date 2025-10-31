import { isUndefined } from "@/server/utils";
import type { RawInsertEntityInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	name?: string;
	description?: string;
	location?: string;

	validate: Validate;
	sanitize: Sanitize;

	constructor({ name, description, location }: RawInsertEntityInputs) {
		if (!isUndefined(name)) this.name = name;
		if (!isUndefined(description)) this.description = description;
		if (!isUndefined(location)) this.location = location;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		const { name, description, location, validate } = this;
		if (!name && !description && !location) {
			throw Error("No value set");
		}

		if (name) this.name = validate.name(name);
		if (description) this.description = validate.description(description);
		if (location) this.location = validate.location(location);
	}

	getSanitized() {
		return {
			name: this.name ? this.sanitize.name(this.name) : undefined,
			description: this.sanitize.description(this.description),
			location: this.sanitize.location(this.location),
		};
	}
}
