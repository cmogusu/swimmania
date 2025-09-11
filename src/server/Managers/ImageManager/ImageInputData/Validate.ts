import { BaseValidate } from "../../services/BaseValidate";
import type { ImageFileDataItem } from "../types";

// TODO: implement this correctly
export class Validate extends BaseValidate {
	file(file?: ImageFileDataItem) {
		if (!file) {
			return;
		}

		if (!file.originalname) {
			throw Error("Invalid file name");
		}

		if (!file.path) {
			throw Error("Invalid file path");
		}
	}

	filepath(filepath?: unknown) {
		if (filepath && typeof filepath === "string" && filepath.length > 40) {
			throw Error("filepath too long");
		}
	}
}

export const ValidateInstance = new Validate();
