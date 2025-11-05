import type { RawUpdateImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class UpdateInputData extends BaseInputData {
	id: number;
	entityId: number;
	alt: string;

	constructor({ entityId, alt, id }: RawUpdateImageInputs) {
		super();
		this.id = id;
		this.entityId = entityId;
		this.alt = alt;
	}

	validateData() {
		this.id = this.validate.id(this.id);
		this.entityId = this.validate.id(this.entityId);
		this.alt = this.validate.description(this.alt);
	}
}
