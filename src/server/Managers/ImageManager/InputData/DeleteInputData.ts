import type { RawDeleteImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class DeleteInputData extends BaseInputData {
	id: number;
	entityId: number;

	constructor({ id, entityId }: RawDeleteImageInputs) {
		super();
		this.id = id;
		this.entityId = entityId;
	}

	validateData() {
		this.id = this.validate.id(this.id);
		this.entityId = this.validate.id(this.entityId);
	}
}
