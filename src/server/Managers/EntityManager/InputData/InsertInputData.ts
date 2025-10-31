import { isUndefined } from "@/server/utils";
import type { RawInsertEntityInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	name: string;
	userId: number;
	description?: string;

	validate: Validate;
	sanitize: Sanitize;

	constructor({ name, description, userId }: RawInsertEntityInputs) {
		this.name = name;
		this.userId = userId;
		if (!isUndefined(description)) this.description = description;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		const { name, description, userId, validate } = this;
		this.name = validate.name(name);
		this.userId = validate.id(userId);
		if (description) this.description = validate.description(description);
	}

	getSanitized() {
		return {
			name: this.sanitize.name(this.name),
			userId: this.userId,
			description: this.sanitize.description(this.description),
		};
	}
}
