import { type FileManager, fileManagerFactory } from "../../FileManager";
import type { RawImportData } from "../types";

export class ImportManager {
	fileManager: FileManager;

	constructor() {
		this.fileManager = fileManagerFactory.getInstance();
	}

	async import(rawInputs: RawImportData) {
		const filepath = await this.fileManager.uploadPDF(rawInputs);
		console.log(filepath);
	}
}
