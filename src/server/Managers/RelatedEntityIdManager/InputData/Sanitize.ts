import type { RelationshipType } from "@/server/types";
import { BaseSanitize } from "../../services/BaseSanitize";

export class Sanitize extends BaseSanitize {
	relationshipType(type: RelationshipType) {
		return this.sanitizeString(type);
	}
}

export const SanitizeInstance = new Sanitize();
