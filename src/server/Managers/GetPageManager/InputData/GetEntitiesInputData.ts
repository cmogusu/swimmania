import { ManuEntityTypes } from "@/server/constants";
import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import type { EntityType, MenuEntityType } from "@/server/types";
import type { RawGetEntitiesInputs } from "../types";
import { type Validate, ValidateInstance } from "./Validate";

export class GetEntitiesInputData extends BaseInputData {
	entityType: EntityType;
	validate: Validate;

	constructor({ entityType, pageSize, pageNumber }: RawGetEntitiesInputs) {
		super();

		this.entityType = entityType;
		this.pageSize = pageSize;
		this.pageNumber = pageNumber;
		this.validate = ValidateInstance;
	}

	validateData() {
		const isEntityTypeValid = ManuEntityTypes.includes(
			this.entityType as MenuEntityType,
		);

		if (!isEntityTypeValid) {
			throw Error("Invalid entity type");
		}
	}
}
