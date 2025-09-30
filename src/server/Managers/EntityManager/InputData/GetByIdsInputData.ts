import { BaseInputData } from "../../services";
import type { ILoadableEntity, RawGetByIdsEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByIdsInputData
	extends BaseInputData
	implements ILoadableEntity
{
	entityIds: number[];

	loadDefaultImage: boolean;
	loadImages: boolean;
	loadMetadata: boolean;

	validate: Validate;

	constructor({
		entityIds,
		pageSize,
		pageNumber,
		loadDefaultImage,
		loadImages,
		loadMetadata,
	}: RawGetByIdsEntityInputs) {
		super();

		this.entityIds = entityIds;
		this.pageSize = pageSize;
		this.pageNumber = pageNumber;

		this.loadImages = sanitizeBoolean(loadImages, false);
		this.loadMetadata = sanitizeBoolean(loadMetadata, false);
		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, true);

		this.validate = ValidateInstance;
	}

	validateData() {
		this.validate.ids(this.entityIds);
	}

	getSanitized() {
		return {
			entityIds: this.entityIds,
		};
	}
}
