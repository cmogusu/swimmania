import { BaseSanitize } from "../../services/BaseSanitize";
import type { RelationshipType } from "../types";

export class Sanitize extends BaseSanitize {
	relationshipType(type: RelationshipType) {
		return this.sanitizeString(type);
	}
}

export const SanitizeInstance = new Sanitize();
