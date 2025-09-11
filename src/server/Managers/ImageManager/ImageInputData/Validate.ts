import { BaseValidate } from "../../services/BaseValidate";
import type { ImageFileDataItem } from "../types";

export class Validate extends BaseValidate {
	file(file?: ImageFileDataItem) {
		if (!file) {
			throw Error("File not set");
		}

		if (!file.originalname) {
			throw Error("Invalid file name");
		}

		if (!file.path) {
			throw Error("Invalid file path");
		}
	}
}

export const ValidateInstance = new Validate();
