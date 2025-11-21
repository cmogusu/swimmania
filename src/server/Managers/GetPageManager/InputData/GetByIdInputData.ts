import type { EntityType } from "@/server/types";
import type { ILoadableEntity, RawGetByIdEntityInputs } from "../types";
import { sanitizeBoolean } from "./utils";
import { type Validate, ValidateInstance } from "./Validate";

export class GetByIdInputData implements ILoadableEntity {
	entityId: number;
	entityType: EntityType;
	userId?: string;

	loadDefaultImage: boolean;
	loadUserCanEdit: boolean;

	validate: Validate;

	constructor({
		userId,
		entityId,
		entityType,
		loadDefaultImage,
		loadUserCanEdit,
	}: RawGetByIdEntityInputs) {
		this.userId = userId;
		this.entityId = entityId;
		this.entityType = entityType;

		this.loadDefaultImage = sanitizeBoolean(loadDefaultImage, true);
		this.loadUserCanEdit = sanitizeBoolean(loadUserCanEdit, false);

		this.validate = ValidateInstance;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
		this.entityType = this.validate.entityType(this.entityType);
		if (this.userId) this.userId = this.validate.stringId(this.userId);
	}
}
