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
	loadUserCanEdit: boolean;

	validate: Validate;

	constructor({
		entityIds,
		pageSize,
		pageNumber,
		loadDefaultImage,
		loadUserCanEdit,
	}: RawGetByIdsEntityInputs) {
		super();

		this.entityIds = entityIds;
		this.pageSize = pageSize;
		this.pageNumber = pageNumber;

		this.loadUserCanEdit = sanitizeBoolean(loadUserCanEdit, false);
		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, true);

		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityIds = this.validate.ids(this.entityIds);
	}
}
