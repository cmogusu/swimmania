import { isUndefined } from "@/server/utils";
import type { RawInsertEntityInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	name?: string;
	description?: string;
	userId?: number;

	validate: Validate;
	sanitize: Sanitize;

	constructor({ name, description, userId }: RawInsertEntityInputs) {
		if (!isUndefined(name)) this.name = name;
		if (!isUndefined(description)) this.description = description;
		if (!isUndefined(userId)) this.userId = userId;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		const { name, description, userId, validate } = this;
		if (!name && !description && !userId) {
			throw Error("No value set");
		}

		if (name) this.name = validate.name(name);
		if (description) this.description = validate.description(description);
		if (userId) this.userId = validate.id(userId);
	}

	getSanitized() {
		return {
			name: this.name ? this.sanitize.name(this.name) : undefined,
			description: this.sanitize.description(this.description),
			userId: this.userId,
		};
	}
}
