import type { RawSetDefaultImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class SetDefaultInputData extends BaseInputData {
	id: number;
	entityId: number;
	isDefault: boolean;

	constructor({ id, entityId, isDefault }: RawSetDefaultImageInputs) {
		super();
		this.id = id;
		this.entityId = entityId;
		this.isDefault = isDefault;
	}

	validateData() {
		this.id = this.validate.id(this.id);
		this.entityId = this.validate.id(this.entityId);
		this.isDefault = this.validate.boolean(this.isDefault);
	}
}
