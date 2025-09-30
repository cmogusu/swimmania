import { isUndefined } from "@/server/utils";
import type { RawUpdateMetadataInputs } from "../types";
import { InsertInputData } from "./InsertInputData";

export class UpdateInputData extends InsertInputData {
	id: number;

	constructor(rawInputs: RawUpdateMetadataInputs) {
		super(rawInputs);

		const { name, value, entityType, entityId, itemIndex } = rawInputs;
		this.entityId = entityId;
		this.entityType = entityType;
		this.name = name;
		this.id = rawInputs.id;

		if (!isUndefined(value)) this.value = value;
		if (!isUndefined(itemIndex)) this.itemIndex = itemIndex;
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
