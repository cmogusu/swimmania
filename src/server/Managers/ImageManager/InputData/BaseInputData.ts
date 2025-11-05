import { type Validate, ValidateInstance } from "./Validate";

export class BaseInputData {
	readonly validate: Validate;

	constructor() {
		this.validate = ValidateInstance;
	}
}
