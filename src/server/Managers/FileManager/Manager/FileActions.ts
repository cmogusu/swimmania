import crypto from "node:crypto";
import fs from "node:fs";
import {
	access,
	constants,
	mkdir,
	readdir,
	rm,
	stat,
	writeFile,
} from "node:fs/promises";
import path from "node:path";
import tmp from "tmp";
import { PUBLIC_FOLDER, UPLOADS_FOLDER } from "@/server/constants/paths";
import type { DeleteFileInputData, UploadFileInputData } from "../InputData";

export class FileActions {
	constructor() {
		tmp.setGracefulCleanup();
	}

	async upload({
		file,
		uploadDirectory,
	}: UploadFileInputData): Promise<string> {
		const arrayBuffer = await file.arrayBuffer();
		const buffer = new Uint8Array(arrayBuffer);
		const fileHash = this.getFileHash(buffer);
		const filePath = this.getFilePath(uploadDirectory, file.name, fileHash);
		const exists = await this.fileExists(filePath);
		if (!exists) {
			await writeFile(filePath, buffer);
		}

		return filePath;
	}

	getPathToUploadsFolder(filePath: string) {
		return filePath.replace(PUBLIC_FOLDER, "");
	}

	getFilePath(uploadDirectory: string, fileName: string, fileHash: string) {
		const ext = path.extname(fileName);
		const newFileName = `${fileHash}${ext}`;
		return path.join(uploadDirectory, newFileName);
	}

	writeTempFile(buffer: Uint8Array) {
		const { fd, removeCallback } = tmp.fileSync();
		if (!fd) {
			throw Error("Unable to create temporary file");
		}

		const bytesWritten = fs.writeSync(fd, buffer);
		if (!bytesWritten) {
			throw Error("Unable to write to temp file");
		}

		return removeCallback;
	}

	async delete(inputData: DeleteFileInputData): Promise<void> {
		const exists = await this.fileExists(inputData.filePath);
		if (exists) {
			await rm(inputData.filePath);
		}
	}

	fileExists(filePath: string): Promise<boolean> {
		return access(filePath, constants.R_OK)
			.then(() => true)
			.catch(() => false);
	}

	getFileHash(buffer: Uint8Array) {
		const hash = crypto.createHash("sha256");
		hash.update(buffer);
		return hash.digest("hex");
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
