import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import type { MetadataFilter } from "@/server/types";
import type { ILoadableEntity, RawGetAllEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";

export class GetAllInputData extends BaseInputData implements ILoadableEntity {
	filters?: MetadataFilter[];

	loadDefaultImage: boolean;
	loadImages: boolean;
	loadMetadata: boolean;

	constructor({
		filters,
		pageSize,
		pageNumber,
		loadDefaultImage,
		loadImages,
		loadMetadata,
	}: RawGetAllEntityInputs) {
		super();

		this.filters = filters;
		this.pageSize = pageSize;
		this.pageNumber = pageNumber;

		this.loadImages = sanitizeBoolean(loadImages, false);
		this.loadMetadata = sanitizeBoolean(loadMetadata, false);
		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, true);
	}

	validateData() {}

	getSanitized() {
		return {
			offset: this.offset,
			pageSize: this.pageSize,
		};
	}
}
