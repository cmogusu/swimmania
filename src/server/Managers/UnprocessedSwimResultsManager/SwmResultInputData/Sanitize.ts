import { BaseSanitize } from "../../services/BaseSanitize";

export class Sanitize extends BaseSanitize {}

const sanitizeString = (v: string) => {
	return v;
};

export const SanitizeInstance = new Sanitize();
