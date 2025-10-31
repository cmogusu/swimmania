import { isUndefined } from "@/server/utils";
import type { RawUpdateEntityInputs } from "../types";
import { InsertInputData } from "./InsertInputData";

export class UpdateInputData extends InsertInputData {
	entityId: number;

	constructor(rawInputs: RawUpdateEntityInputs) {
		super(rawInputs);

		const { entityId, name, description, userId } = rawInputs;

		this.name = name;
		this.entityId = entityId;
		if (!isUndefined(description)) this.description = description;
		if (!isUndefined(userId)) this.userId = userId;
	}

	validateData() {
		super.validateData();
		this.validate.id(this.entityId);
		this.validate.id(this.userId);
	}

	getSanitized() {
		return {
			entityId: this.entityId,
			...super.getSanitized(),
		};
	}
}
