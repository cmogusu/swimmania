import type { RawDeleteRelatedInputData } from "../types";
import { GetInputData } from "./GetInputData";

export class DeleteInputData extends GetInputData {
	readonly relatedEntityId: number;

	constructor({
		entityType,
		entityId,
		relatedEntityType,
		relatedEntityId,
		relationshipType,
	}: RawDeleteRelatedInputData) {
		super({
			entityType,
			entityId,
			relatedEntityType,
			relationshipType,
		});

		this.relatedEntityId = relatedEntityId;
	}

	validateData() {
		super.validateData();
		this.validate.id(this.relatedEntityId);
	}

	getSanitized() {
		return {
			...super.getSanitized(),
			relatedEntityId: this.relatedEntityId,
		};
	}
}
