import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import type { EntityType, MetadataFilter } from "@/server/types";
import type { ILoadableEntity, RawGetAllEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetAllInputData extends BaseInputData implements ILoadableEntity {
	userId?: string;
	entityType: EntityType;
	filters?: MetadataFilter[];

	loadDefaultImage: boolean;
	loadUserCanEdit: boolean;

	validate: Validate;

	constructor({
		userId,
		entityType,
		filters,
		pageSize,
		pageNumber,
		loadDefaultImage,
		loadUserCanEdit,
	}: RawGetAllEntityInputs) {
		super();

		this.userId = userId;
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
		if (this.userId) this.userId = this.validate.stringId(this.userId);
	}
}
