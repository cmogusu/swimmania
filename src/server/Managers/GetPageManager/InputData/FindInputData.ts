import type { EntityType } from "@/server/types";
import { isUndefined } from "@/server/utils";
import type { RawFindEntityInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class FindInputData {
	userId?: string;
	entityType: EntityType;
	name: string;
	description?: string;

	validate: Validate;

	constructor({ userId, entityType, name, description }: RawFindEntityInputs) {
		this.userId = userId;
		this.name = name;
		this.entityType = entityType;
		if (!isUndefined(description)) this.description = description;

		this.validate = ValidateInstance;
	}

	validateData() {
		this.name = this.validate.name(this.name);
		this.entityType = this.validate.entityType(this.entityType);
		if (this.userId) this.userId = this.validate.stringId(this.userId);
		if (this.description)
			this.description = this.validate.description(this.description);
	}
}
