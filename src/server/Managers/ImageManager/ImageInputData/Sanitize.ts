import { BaseSanitize } from "../../services/BaseSanitize";
import type { ImageFileDataItem } from "../types";

export class Sanitize extends BaseSanitize {
	file(file?: ImageFileDataItem) {
		if (!file) {
			return;
		}

		return {
			originalname: this.sanitizeString(file.originalname),
			path: this.sanitizeString(file.path),
			filename: this.sanitizeString(file.filename),
			size: Number(file.size),
		};
	}

	filepath(filepath?: string) {
		return this.optionalSanitizeString(filepath);
	}
}

export const SanitizeInstance = new Sanitize();
