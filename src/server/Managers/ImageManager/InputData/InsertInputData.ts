import { PUBLIC_FOLDER } from "@/server/constants/paths";
import type { EntityType } from "@/server/types";
import type { RawInsertImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class InsertInputData extends BaseInputData {
	entityType: EntityType;
	userId: string;
	entityId: number;
	alt: string;
	filepath: string;

	constructor({
		entityType,
		userId,
		entityId,
		alt,
		filepath,
	}: RawInsertImageInputs) {
		super();
		this.entityType = entityType;
		this.userId = userId;
		this.entityId = entityId;
		this.alt = alt;
		this.filepath = filepath.replace(PUBLIC_FOLDER, "");
	}

	validateData() {
		this.entityType = this.validate.entityType(this.entityType);
		this.userId = this.validate.stringId(this.userId);
		this.entityId = this.validate.id(this.entityId);
		this.alt = this.validate.description(this.alt);
		this.filepath = this.validate.filepath(this.filepath);
	}
}
