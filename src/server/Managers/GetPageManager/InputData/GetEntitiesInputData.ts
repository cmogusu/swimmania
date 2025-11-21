import z from "zod";
import { ManuEntityTypes } from "@/server/constants";
import { BaseInputData } from "@/server/Managers/services/BaseInputData";
import type { EntityType } from "@/server/types";
import type { RawGetEntitiesInputs } from "../types";

export class GetEntitiesInputData extends BaseInputData {
	entityType: EntityType;

	constructor({ entityType, pageSize, pageNumber }: RawGetEntitiesInputs) {
		super();

		this.entityType = entityType;
		this.pageSize = pageSize;
		this.pageNumber = pageNumber;
	}

	validateData() {
		z.enum(ManuEntityTypes).parse(this.entityType);
	}
}
