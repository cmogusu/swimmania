import type { ILoadableEntity, RawGetByIdEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByIdInputData implements ILoadableEntity {
	entityId: number;

	loadDefaultImage: boolean;
	loadUserCanEdit: boolean;

	validate: Validate;

	constructor({
		entityId,
		loadDefaultImage,
		loadUserCanEdit,
	}: RawGetByIdEntityInputs) {
		this.entityId = entityId;

		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, true);
		this.loadUserCanEdit = sanitizeBoolean(loadUserCanEdit, false);

		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
	}
}
