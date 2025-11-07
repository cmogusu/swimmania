import type { RawDeleteFileInputs } from "../types";
import { type Validate, ValidateInstance } from "../Validate";

export class DeleteFileInputData {
	filePath: string;
	uploadDirectory: string;
	validate: Validate;

	constructor({ filePath, uploadDirectory }: RawDeleteFileInputs) {
		this.filePath = filePath;
		this.uploadDirectory = uploadDirectory;
		this.validate = ValidateInstance;
	}

	async validateData() {
		this.validate.filePath(this.filePath);
		await this.validate.directory(this.uploadDirectory);
	}
}
