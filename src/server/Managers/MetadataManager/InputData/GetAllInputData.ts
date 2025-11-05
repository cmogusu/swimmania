import type { EntityType } from "../../../types";
import { BaseInputData } from "../../services/BaseInputData";
import type { RawGetAllMetadataInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class GetAllInputData extends BaseInputData {
	entityId: number;
	entityType: EntityType;

	validate: Validate;

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
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.entityId = this.validate.id(this.entityId);
	}
}
