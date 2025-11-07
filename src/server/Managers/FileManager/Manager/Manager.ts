import { ALLOWED_IMAGE_TYPES, ALLOWED_PDF_TYPES } from "@/server/constants";
import { IMAGE_FOLDER, PDF_FOLDER } from "@/server/constants/paths";
import { DeleteFileInputData, UploadFileInputData } from "../InputData";
import type {
	RawDeleteFileInputs,
	RawDeleteImageInputs,
	RawDeletePdfInputs,
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

	uploadImage({ file }: RawUploadImageInputs) {
		return this.uploadFile({
			file,
			uploadDirectory: IMAGE_FOLDER,
			allowedFileTypes: ALLOWED_IMAGE_TYPES,
		});
	}

	uploadPDF({ file }: RawUploadPdfInputs) {
		return this.uploadFile({
			file,
			uploadDirectory: PDF_FOLDER,
			allowedFileTypes: ALLOWED_PDF_TYPES,
		});
	}

	async uploadFile(rawInputs: RawUploadFileInputs) {
		const inputData = new UploadFileInputData(rawInputs);
		await inputData.validateData();

		await this.fileActions.upload(inputData);
	}

	deleteImage({ filePath }: RawDeleteImageInputs) {
		this.deleteFile({
			filePath,
			uploadDirectory: IMAGE_FOLDER,
		});
	}

	deletePDF({ filePath }: RawDeletePdfInputs) {
		this.deleteFile({
			filePath,
			uploadDirectory: PDF_FOLDER,
		});
	}

	async deleteFile(rawInputs: RawDeleteFileInputs) {
		const inputData = new DeleteFileInputData(rawInputs);
		await inputData.validateData();

		await this.fileActions.delete(inputData);
	}
}
