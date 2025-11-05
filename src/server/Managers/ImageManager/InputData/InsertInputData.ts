import { PUBLIC_FOLDER } from "@/server/constants/paths";
import type { RawInsertImageInputs } from "../types";
import { BaseInputData } from "./BaseInputData";

export class InsertInputData extends BaseInputData {
	entityId: number;
	alt: string;
	filepath: string;

	constructor({ entityId, alt, filepath }: RawInsertImageInputs) {
		super();
		this.entityId = entityId;
		this.alt = alt;
		this.filepath = filepath.replace(PUBLIC_FOLDER, "");
	}

	validateData() {
		this.entityId = this.validate.id(this.entityId);
		this.alt = this.validate.description(this.alt);
		this.filepath = this.validate.filepath(this.filepath);
	}
}
