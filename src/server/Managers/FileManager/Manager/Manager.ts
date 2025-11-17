import { access, constants, readFile } from "node:fs/promises";
import { ALLOWED_IMAGE_TYPES, ALLOWED_PDF_TYPES } from "@/server/constants";
import {
	IMAGE_FOLDER,
	PDF_FOLDER,
	PUBLIC_FOLDER,
} from "@/server/constants/paths";
import {
	ImageTextExtractor,
	PdfTextExtractor,
} from "../../ImportManager/TextExtractors.ts";
import { DeleteFileInputData, UploadFileInputData } from "../InputData";
import type {
	RawDeleteFileInputs,
	RawUploadFileInputs,
	RawUploadImageInputs,
	RawUploadPdfInputs,
} from "../types";
import { FileActions } from "./FileActions";

export class FileManager {
	fileActions: FileActions;

	constructor() {
		this.fileActions = new FileActions();
	}

	uploadImage({ file }: RawUploadImageInputs): Promise<string> {
		return this.uploadFile({
			file,
			uploadDirectory: IMAGE_FOLDER,
			allowedFileTypes: ALLOWED_IMAGE_TYPES,
		});
	}

	uploadPDF({ file }: RawUploadPdfInputs): Promise<string> {
		return this.uploadFile({
			file,
			uploadDirectory: PDF_FOLDER,
			allowedFileTypes: ALLOWED_PDF_TYPES,
		});
	}

	async uploadFile(rawInputs: RawUploadFileInputs): Promise<string> {
		const inputData = new UploadFileInputData(rawInputs);
		await inputData.validateData();
		return await this.fileActions.upload(inputData);
	}

	getRelativePath(filePath: string) {
		return filePath.replace(PUBLIC_FOLDER, "");
	}

	async deleteFile(rawInputs: RawDeleteFileInputs) {
		const inputData = new DeleteFileInputData(rawInputs);
		await inputData.validateData();

		await this.fileActions.delete(inputData);
	}

	async readTextFile(filePath: string): Promise<string> {
		await access(filePath, constants.R_OK);
		return await readFile(filePath, "utf8");
	}

	async readPdfFile(
		rawInputs: RawUploadPdfInputs,
	): Promise<{ filePath: string; fileText: string }> {
		const filePath = await this.uploadPDF(rawInputs);
		const fileText = await this.extractTextFromPdf(filePath);
		return { filePath, fileText };
	}

	async readImageFile(
		rawInputs: RawUploadPdfInputs,
	): Promise<{ filePath: string; fileText: string }> {
		const filePath = await this.uploadImage(rawInputs);
		const fileText = await this.extractTextFromImage(filePath);
		return { filePath, fileText };
	}

	async extractTextFromPdf(filePath: string) {
		const extractor = new PdfTextExtractor();
		return await extractor.extract(filePath);
	}

	async extractTextFromImage(filePath: string) {
		const extractor = new ImageTextExtractor();
		return await extractor.extract(filePath);
	}
}
