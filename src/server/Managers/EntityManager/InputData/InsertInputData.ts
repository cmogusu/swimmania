import { isUndefined } from "@/server/utils";
import type { RawInsertEntityInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	name: string;
	description?: string;
	location?: string;

	validate: Validate;
	sanitize: Sanitize;

	constructor({ name, description, location }: RawInsertEntityInputs) {
		this.name = name;
		if (!isUndefined(description)) this.description = description;
		if (!isUndefined(location)) this.location = location;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		this.validate.name(this.name);
		this.validate.description(this.description);
		this.validate.location(this.location);
	}

	getSanitized() {
		return {
			name: this.sanitize.name(this.name),
			description: this.sanitize.description(this.description),
			location: this.sanitize.location(this.location),
		};
	}
}
