import type { EntityType } from "@/server/types";
import type { ILoadableEntity, RawGetByIdEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByIdInputData implements ILoadableEntity {
	entityId: number;
	entityType: EntityType;

	loadDefaultImage: boolean;
	loadUserCanEdit: boolean;

	validate: Validate;

	constructor({
		entityId,
		entityType,
		loadDefaultImage,
		loadUserCanEdit,
	}: RawGetByIdEntityInputs) {
		this.entityId = entityId;
		this.entityType = entityType;

		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, true);
		this.loadUserCanEdit = sanitizeBoolean(loadUserCanEdit, false);

		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.entityType);
	}
}
