import { access, constants, readFile } from "fs/promises";
import pdf from "pdf-parse-new";
import { type FileManager, fileManagerFactory } from "../../FileManager";
import type { RawImportData } from "../types";
import type { ImportManager } from "./types";

export class BaseImportManager implements ImportManager {
	fileManager: FileManager;

	constructor() {
		this.fileManager = fileManagerFactory.getInstance();
	}

	importJson(_fileName: string): Promise<void> {
		throw Error("Not implemented");
	}

	async import(rawInputs: RawImportData) {
		const filepath = await this.fileManager.uploadPDF(rawInputs);
		console.log(filepath);
	}

	async parseFile(filepath: string): Promise<string> {
		await access(filepath, constants.R_OK);
		const buffer = await readFile(filepath);
		const { text } = await pdf(buffer);
		return text;
	}
}
