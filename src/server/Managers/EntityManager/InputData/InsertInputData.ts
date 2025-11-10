import type { EntityType } from "@/server/types";
import { isUndefined } from "@/server/utils";
import type { RawInsertEntityInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class InsertInputData {
	entityType: EntityType;
	name: string;
	description?: string;

	validate: Validate;

	constructor({ entityType, name, description }: RawInsertEntityInputs) {
		this.name = name;
		this.entityType = entityType;
		if (!isUndefined(description)) this.description = description;

		this.validate = ValidateInstance;
	}

	validateData() {
		const { name, description, validate } = this;
		this.name = validate.name(name);
		this.entityType = this.validate.entityType(this.entityType);
		if (description) this.description = validate.description(description);
	}
}
