import { access, constants, writeFile } from "node:fs/promises";
import path from "node:path";
import { PUBLIC_FOLDER } from "@/server/constants/paths";
import type { DeleteFileInputData, UploadFileInputData } from "../InputData";

export class FileActions {
	async upload({
		file,
		uploadDirectory,
	}: UploadFileInputData): Promise<string> {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);
		const filePath = path.join(uploadDirectory, file.name);
		const exists = await this.fileExists(filePath);
		if (!exists) {
			await writeFile(filePath, buffer);
		}

		return this.getRelativePath(filePath);
	}

	delete(_inputData: DeleteFileInputData): Promise<string> {
		return Promise.resolve("path");
	}
	getRelativePath(filePath: string) {
		return filePath.replace(PUBLIC_FOLDER, "");
	}

	fileExists(filePath: string): Promise<boolean> {
		return access(filePath, constants.R_OK)
			.then(() => true)
			.catch(() => false);
	}
}
