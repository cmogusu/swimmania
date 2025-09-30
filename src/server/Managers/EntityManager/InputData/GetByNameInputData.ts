import type { ILoadableEntity, RawGetByNameEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByNameInputData implements ILoadableEntity {
	name: string;

	loadDefaultImage: boolean;
	loadImages: boolean;
	loadMetadata: boolean;

	validate: Validate;

	constructor({
		name,
		loadDefaultImage,
		loadImages,
		loadMetadata,
	}: RawGetByNameEntityInputs) {
		this.name = name;

		this.loadImages = sanitizeBoolean(loadImages, false);
		this.loadMetadata = sanitizeBoolean(loadMetadata, false);
		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, false);

		this.validate = ValidateInstance;
	}

	validateData() {
		this.validate.name(this.name);
	}

	getSanitized() {
		return {
			name: this.name,
		};
	}
}
