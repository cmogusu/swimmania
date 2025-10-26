import type { ILoadableEntity, RawGetByIdEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByIdInputData implements ILoadableEntity {
	entityId: number;

	loadDefaultImage: boolean;
	loadImages: boolean;
	loadMetadata: boolean;

	validate: Validate;

	constructor({
		entityId,
		loadDefaultImage,
		loadImages,
		loadMetadata,
	}: RawGetByIdEntityInputs) {
		this.entityId = entityId;

		this.loadImages = sanitizeBoolean(loadImages, false);
		this.loadMetadata = sanitizeBoolean(loadMetadata, false);
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
