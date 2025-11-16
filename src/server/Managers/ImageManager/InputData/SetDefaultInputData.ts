import type { EntityType } from "@/server/types";
import type { RawSetDefaultImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class SetDefaultInputData extends BaseInputData {
	entityType: EntityType;
	userId: string;
	id: number;
	entityId: number;
	isDefault: boolean;

	constructor({
		entityType,
		userId,
		id,
		entityId,
		isDefault,
	}: RawSetDefaultImageInputs) {
		super();
		this.entityType = entityType;
		this.userId = userId;
		this.id = id;
		this.entityId = entityId;
		this.isDefault = isDefault;
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.userId = this.validate.stringId(this.userId);
		this.id = this.validate.id(this.id);
		this.entityId = this.validate.id(this.entityId);
		this.isDefault = this.validate.boolean(this.isDefault);
	}
}
