import type { EntityType } from "@/server/types";
import type { RawDeleteAllImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class DeleteAllInputData extends BaseInputData {
	entityType: EntityType;
	userId: string;
	entityId: number;

	constructor({ entityType, userId, entityId }: RawDeleteAllImageInputs) {
		super();
		this.entityType = entityType;
		this.userId = userId;
		this.entityId = entityId;
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.userId = this.validate.stringId(this.userId);
		this.entityId = this.validate.id(this.entityId);
	}
}
