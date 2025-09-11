export class BaseSanitize {
	name(name?: string) {
		return name ? removeHTML(name) : undefined;
	}

	description(description?: string) {
		return description ? removeHTML(description) : undefined;
	}

	sanitizeString(v: string) {
		return v;
	}
}

const removeHTML = (v: string): string => v;
