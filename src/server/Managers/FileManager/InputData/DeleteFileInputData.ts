import type { RawDeleteFileInputs } from "../types";
import { type Validate, ValidateInstance } from "../Validate";

export class DeleteFileInputData {
	filePath: string;
	validate: Validate;

	constructor({ filePath }: RawDeleteFileInputs) {
		this.filePath = filePath;
		this.validate = ValidateInstance;
	}

	async validateData() {
		this.validate.filePath(this.filePath);
	}
}
