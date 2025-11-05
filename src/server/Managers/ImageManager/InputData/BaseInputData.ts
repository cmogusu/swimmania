import { type Sanitize, SanitizeInstance } from "./Sanitize";
import { type Validate, ValidateInstance } from "./Validate";

export class BaseInputData {
	readonly validate: Validate;
	readonly sanitize: Sanitize;

	constructor() {
		this.validate = ValidateInstance;
		this.sanitize = SanitizeInstance;
	}
}
