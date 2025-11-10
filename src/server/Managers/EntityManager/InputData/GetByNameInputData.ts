import type { EntityType } from "@/server/types";
import type { ILoadableEntity, RawGetByNameEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByNameInputData implements ILoadableEntity {
	name: string;
	entityType: EntityType;

	loadDefaultImage: boolean;
	loadUserCanEdit: boolean;

	validate: Validate;

	constructor({
		name,
		entityType,
		loadDefaultImage,
		loadUserCanEdit,
	}: RawGetByNameEntityInputs) {
		this.name = name;
		this.entityType = entityType;

		this.loadUserCanEdit = sanitizeBoolean(loadUserCanEdit, false);
		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, false);

		this.validate = ValidateInstance;
	}

	validateData() {
		this.name = this.validate.name(this.name);
		this.entityType = this.validate.entityType(this.entityType);
	}
}
