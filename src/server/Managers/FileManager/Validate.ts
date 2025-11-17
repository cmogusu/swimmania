import { access, constants } from "node:fs/promises";
import z from "zod";
import { BaseValidate } from "@/server/Managers/services/BaseValidate";

const MAX_FILE_NAME_LENGTH = 255 - 64;

export class Validate extends BaseValidate {
	async directory(uploadDirectory: string) {
		await access(uploadDirectory, constants.R_OK);
	}

	filePath(filePath: string) {
		return this.string(filePath);
	}

	file(file: File, allowedFileTypes: string[]) {
		return z
			.file()
			.min(1)
			.max(1024 * 1024)
			.mime(allowedFileTypes)
			.parse(file);
	}

	fileName(fileName: string) {
		return z.string().min(3).max(MAX_FILE_NAME_LENGTH).parse(fileName);
	}
}

export const ValidateInstance = new Validate();
