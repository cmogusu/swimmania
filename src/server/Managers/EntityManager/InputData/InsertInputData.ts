import { isUndefined } from "@/server/utils";
import type { RawInsertEntityInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	name: string;
	description?: string;

	validate: Validate;

	constructor({ name, description }: RawInsertEntityInputs) {
		this.name = name;
		if (!isUndefined(description)) this.description = description;

		this.validate = ValidateInstance;
	}

	validateData() {
		const { name, description, validate } = this;
		this.name = validate.name(name);
		if (description) this.description = validate.description(description);
	}
}
