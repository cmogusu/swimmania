import crypto from "node:crypto";
import fs from "node:fs";
import {
	access,
	constants,
	mkdir,
	readdir,
	rename,
	stat,
	writeFile,
} from "node:fs/promises";
import path from "node:path";
import { UPLOADS_FOLDER } from "@/server/constants/paths";
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

		return filePath;
	}

	delete(inputData: DeleteFileInputData): Promise<string> {
		console.log(`deleted ${inputData.filePath}`);
		return Promise.resolve("path");
	}

	fileExists(filePath: string): Promise<boolean> {
		return access(filePath, constants.R_OK)
			.then(() => true)
			.catch(() => false);
	}

	getFileHash(filePath: string) {
		return new Promise((resolve) => {
			const hash = crypto.createHash("sha256");
			const stream = fs.createReadStream(filePath);

			stream.on("error", (error) => console.log(error));
			stream.on("data", (chunk) => hash.update(chunk));
			stream.on("end", () => {
				resolve(hash.digest("hex"));
			});
		});
	}

	async uploadSth() {
		const filePath = "/Users/clive/www/swimmania/public/uploads/camel.jpg";
		const hash =
			"febf88ea4051355e7918b87cf19c9602a9c8223dbe2eb5ca15b7d469823254c7";

		const folderPath = this.getFolderPath(hash);
		await this.createFolder(folderPath);
		await this.moveFileIntoFolder(folderPath, filePath);
	}

	async moveFileIntoFolder(folderPath: string, filePath: string) {
		const fileName = path.basename(filePath);
		const fileNameInFolder = path.join(folderPath, fileName);
		try {
			await access(fileNameInFolder);
		} catch (_e) {
			await rename(filePath, fileNameInFolder);
		}
	}

	getFolderPath(folderName: string) {
		return path.join(UPLOADS_FOLDER, folderName);
	}

	async createFolder(folderPath: string) {
		try {
			await access(folderPath, constants.W_OK);
		} catch (_e) {
			await mkdir(folderPath);
		}
	}

	async getMostRecent() {
		const files = await readdir(UPLOADS_FOLDER);
		const promises = files.map((f) => {
			const filePath = path.join(UPLOADS_FOLDER, f);
			return stat(filePath);
		});

		const fileStats = await Promise.all(promises);
		const sorted = fileStats.sort((f1, f2) => f1.birthtimeMs - f2.birthtimeMs);
		for (const fileStat of sorted) {
			console.log(fileStat);
		}
	}
}
