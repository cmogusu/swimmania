import z from "zod";
import { BaseValidate } from "../../services/BaseValidate";
import type { ImageFileDataItem } from "../types";

export class Validate extends BaseValidate {
	fileValidator = z.optional(
		z.object({
			originalname: z.string().min(1).max(100),
			path: z.string().min(1).max(255),
			filename: this.nameValidator,
			size: z.optional(z.number()),
		}),
	);

	filepathValidator = z.optional(z.string().min(1).max(255));

	file(file?: ImageFileDataItem) {
		this.fileValidator.parse(file);
	}

	filepath(filepath?: string) {
		this.filepathValidator.parse(filepath);
	}
}

export const ValidateInstance = new Validate();
