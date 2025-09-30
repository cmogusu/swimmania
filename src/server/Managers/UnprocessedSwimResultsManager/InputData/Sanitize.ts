import { BaseSanitize } from "../../services/BaseSanitize";

export class Sanitize extends BaseSanitize {
	team(t: string) {
		return this.sanitizeString(t);
	}

	distance(d: string) {
		return this.sanitizeString(d);
	}

	ageGroup(ageGroup: string) {
		return this.sanitizeString(ageGroup);
	}

	thirdName(n?: string) {
		return this.optionalSanitizeString(n);
	}
}

export const SanitizeInstance = new Sanitize();
