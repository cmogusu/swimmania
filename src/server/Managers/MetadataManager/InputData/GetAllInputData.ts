import type { EntityType } from "../../../types";
import { BaseInputData } from "../../services/BaseInputData";
import type { RawGetAllMetadataInputs } from "../types";
import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class GetAllInputData extends BaseInputData {
	entityId: number;
	entityType: EntityType;

	validate: Validate;
	sanitize: Sanitize;

	constructor({
		entityType,
		entityId,
		pageSize,
		pageNumber,
	}: RawGetAllMetadataInputs) {
		super();

		this.entityId = entityId;
		this.entityType = entityType;

		this.pageSize = pageSize;
		this.pageNumber = pageNumber;

		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}

	validateData() {
		this.validate.entityType(this.entityType);
		this.validate.id(this.entityId);
	}

	getSanitized() {
		return {
			entityId: this.sanitize.id(this.entityId),
			offset: this.offset,
			pageSize: this.pageSize,
		};
	}
}
