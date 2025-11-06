import type { RawDeleteByIdImageInputs } from "../types";
import { DeleteAllInputData } from "./DeleteAllInputData";

export class DeleteByIdInputData extends DeleteAllInputData {
	id: number;

	constructor(rawInputs: RawDeleteByIdImageInputs) {
		super(rawInputs);
		this.id = rawInputs.id;
	}

	validateData() {
		super.validateData();
		this.id = this.validate.id(this.id);
	}
}
