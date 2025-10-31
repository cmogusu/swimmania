import type { ILoadableEntity, RawGetByIdEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByIdInputData implements ILoadableEntity {
	entityId: number;

	loadDefaultImage: boolean;
	loadImages: boolean;

	validate: Validate;

	constructor({
		entityId,
		loadDefaultImage,
		loadImages,
	}: RawGetByIdEntityInputs) {
		this.entityId = entityId;

		this.loadImages = sanitizeBoolean(loadImages, false);
		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, true);

		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
	}

	getSanitized() {
		return {
			entityId: this.entityId,
		};
	}
}
