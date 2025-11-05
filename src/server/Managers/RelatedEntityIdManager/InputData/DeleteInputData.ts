import type { RawDeleteRelatedInputData } from "../types";
import { BaseInputData } from "./BaseInputData";

export class DeleteInputData extends BaseInputData {
	relatedEntityId: number | string;

	constructor(rawInputs: RawDeleteRelatedInputData) {
		super(rawInputs);
		this.relatedEntityId = rawInputs.relatedEntityId;
	}
}
