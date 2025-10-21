// import DOMPurify from "dompurify";

export class BaseSanitize {
	id(id?: number) {
		return id ? Number(id) : 0;
	}

	name(name: string) {
		return this.sanitizeString(name);
	}

	text(text: string) {
		return this.sanitizeString(text);
	}

	number(n: number) {
		return Number(n);
	}

	description(description?: string) {
		return description ? this.sanitizeString(description) : undefined;
	}

	entityType(entityType: string) {
		return this.sanitizeString(entityType);
	}

	sanitizeString = (v: string) => {
		// TODO: Fix sanitize function
		// return DOMPurify.sanitize(v);
		return v;
	};

	optionalSanitizeString = (v?: string) => {
		return v ? this.sanitizeString(v) : undefined;
	};
}
