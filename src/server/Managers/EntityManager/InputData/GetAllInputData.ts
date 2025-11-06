import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import type { MetadataFilter } from "@/server/types";
import type { ILoadableEntity, RawGetAllEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";

export class GetAllInputData extends BaseInputData implements ILoadableEntity {
	filters?: MetadataFilter[];

	loadDefaultImage: boolean;
	loadUserCanEdit: boolean;

	constructor({
		filters,
		pageSize,
		pageNumber,
		loadDefaultImage,
		loadUserCanEdit,
	}: RawGetAllEntityInputs) {
		super();

		this.filters = filters;
		this.pageSize = pageSize;
		this.pageNumber = pageNumber;

		this.loadUserCanEdit = sanitizeBoolean(loadUserCanEdit, false);
		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, true);
	}

	validateData() {}
}
