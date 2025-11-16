import { ALLOWED_IMAGE_TYPES, ALLOWED_PDF_TYPES } from "@/server/constants";
import {
	IMAGE_FOLDER,
	PDF_FOLDER,
	PUBLIC_FOLDER,
} from "@/server/constants/paths";
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
}
