import { access, constants } from "node:fs/promises";
import z from "zod";
import { BaseValidate } from "@/server/Managers/services/BaseValidate";

export class Validate extends BaseValidate {
	// TODO: Try out with z.file
	fileValidator = z.object({
		name: z.string().min(1).max(100),
		type: z.string().min(1).max(255),
		// filename: z.string().min(1),
		// size: z.optional(z.number()),
	});

	// TODO: implement this
	filePathValidator = z.string();

	file(file: File, allowedFileTypes: string[]) {
		if (!allowedFileTypes.includes(file.type)) {
			throw Error("Invalid file type");
		}

		return this.fileValidator.parse(file);
	}

	async directory(uploadDirectory: string) {
		await access(uploadDirectory, constants.R_OK);
	}

	filePath(path: string) {
		return this.filePathValidator.parse(path);
	}
}

export const ValidateInstance = new Validate();
