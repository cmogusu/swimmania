import type { EntityType } from "@/server/types";
import type { RawUpdateImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class UpdateInputData extends BaseInputData {
	entityType: EntityType;
	userId: string;
	id: number;
	entityId: number;
	alt: string;

	constructor({ entityType, userId, entityId, alt, id }: RawUpdateImageInputs) {
		super();
		this.entityType = entityType;
		this.userId = userId;
		this.id = id;
		this.entityId = entityId;
		this.alt = alt;
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.userId = this.validate.stringId(this.userId);
		this.id = this.validate.id(this.id);
		this.entityId = this.validate.id(this.entityId);
		this.alt = this.validate.description(this.alt);
	}
}
