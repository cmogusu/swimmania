import type { RawDeleteAllImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class DeleteAllInputData extends BaseInputData {
	entityId: number;

	constructor({ entityId }: RawDeleteAllImageInputs) {
		super();
		this.entityId = entityId;
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
	}
}
