import type { RawUpdateEntityInputs } from "../types";
import { InsertInputData } from "./InsertInputData";

export class UpdateInputData extends InsertInputData {
	entityId: number;

	constructor(rawInputs: RawUpdateEntityInputs) {
		super(rawInputs);
		this.entityId = rawInputs.entityId;
	}

	validateData() {
		super.validateData();
		this.validate.id(this.entityId);
	}

	getSanitized() {
		return {
			entityId: this.entityId,
			...super.getSanitized(),
		};
	}
}
