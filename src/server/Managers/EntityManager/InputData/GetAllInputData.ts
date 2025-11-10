import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import type { EntityType, MetadataFilter } from "@/server/types";
import type { ILoadableEntity, RawGetAllEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetAllInputData extends BaseInputData implements ILoadableEntity {
	entityType: EntityType;
	filters?: MetadataFilter[];

	loadDefaultImage: boolean;
	loadUserCanEdit: boolean;

	validate: Validate;

	constructor({
		entityType,
		filters,
		pageSize,
		pageNumber,
		loadDefaultImage,
		loadUserCanEdit,
	}: RawGetAllEntityInputs) {
		super();

		this.entityType = entityType;
		this.filters = filters;
		this.pageSize = pageSize;
		this.pageNumber = pageNumber;
		this.validate = ValidateInstance;

		this.loadUserCanEdit = sanitizeBoolean(loadUserCanEdit, false);
		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, true);
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
	}
}
