import type { RawGetDefaultImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class GetDefaultInputData extends BaseInputData {
	entityId: number;

	constructor({ entityId }: RawGetDefaultImageInputs) {
		super();
		this.entityId = entityId;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
	}
}
