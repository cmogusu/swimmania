import type { RawUploadFileInputs } from "../types";
import { type Validate, ValidateInstance } from "../Validate";

export class UploadFileInputData {
	file: File;
	allowedFileTypes: string[];
	uploadDirectory: string;
	validate: Validate;

	constructor({
		file,
		uploadDirectory,
		allowedFileTypes,
	}: RawUploadFileInputs) {
		this.file = file;
		this.allowedFileTypes = allowedFileTypes;
		this.uploadDirectory = uploadDirectory;
		this.validate = ValidateInstance;
	}

	async validateData() {
		this.validate.file(this.file, this.allowedFileTypes);
		await this.validate.directory(this.uploadDirectory);
	}
}
