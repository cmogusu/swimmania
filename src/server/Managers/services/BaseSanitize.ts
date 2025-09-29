import DOMPurify from "dompurify";

export class BaseSanitize {
	name(name: string) {
		return this.sanitizeString(name);
	}

	description(description?: string) {
		return description ? this.sanitizeString(description) : undefined;
	}

	sanitizeString = (v: string) => {
		return DOMPurify.sanitize(v);
	};
}
