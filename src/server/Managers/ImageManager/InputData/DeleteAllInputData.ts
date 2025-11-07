import type { EntityType } from "@/server/types";
import type { RawDeleteAllImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class DeleteAllInputData extends BaseInputData {
	entityType: EntityType;
	entityId: number;

	constructor({ entityType, entityId }: RawDeleteAllImageInputs) {
		super();
		this.entityType = entityType;
		this.entityId = entityId;
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.entityId = this.validate.id(this.entityId);
	}
}
