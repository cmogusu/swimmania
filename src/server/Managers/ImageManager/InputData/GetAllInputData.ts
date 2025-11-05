import type { RawGetAllImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class GetAllInputData extends BaseInputData {
	entityId: number;

	constructor({ entityId }: RawGetAllImageInputs) {
		super();
		this.entityId = entityId;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
	}
}
