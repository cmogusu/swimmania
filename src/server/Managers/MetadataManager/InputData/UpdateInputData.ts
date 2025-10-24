import type { RawUpdateMetadataInputs } from "../types";
import { InsertInputData } from "./InsertInputData";

export class UpdateInputData extends InsertInputData {
	id: number;

	constructor(rawInputs: RawUpdateMetadataInputs) {
		super(rawInputs);
		this.id = rawInputs.id;
	}

	validateData() {
		super.validateData();
		this.validate.id(this.id);
	}

	getSanitized() {
		return {
			id: this.id,
			...super.getSanitized(),
		};
	}
}
