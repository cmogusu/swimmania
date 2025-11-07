import type { EntityType } from "@/server/types";
import type { RawSetDefaultImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class SetDefaultInputData extends BaseInputData {
	entityType: EntityType;
	id: number;
	entityId: number;
	isDefault: boolean;

	constructor({
		entityType,
		id,
		entityId,
		isDefault,
	}: RawSetDefaultImageInputs) {
		super();
		this.entityType = entityType;
		this.id = id;
		this.entityId = entityId;
		this.isDefault = isDefault;
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.id = this.validate.id(this.id);
		this.entityId = this.validate.id(this.entityId);
		this.isDefault = this.validate.boolean(this.isDefault);
	}
}
