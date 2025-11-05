import { JSDOM } from "jsdom";
import { EntityRelationships } from "@/server/constants";
import type {
	EntityType,
	RelatedEntityRelationship,
	RelationshipType,
} from "@/server/types";
import { BaseValidate } from "../../services/BaseValidate";

export class Validate extends BaseValidate {
	relationshipType(
		entitytype: EntityType,
		relatedEntityType: EntityType,
		relationshipType: RelationshipType,
	) {
		const entityRelationships = EntityRelationships[entitytype];
		if (!entityRelationships) {
			throw Error("Invalid entity type");
		}

		const relationship = entityRelationships.find(
			([
				validRelationshipType,
				validRelatedEntityType,
			]: RelatedEntityRelationship) =>
				relationshipType === validRelationshipType &&
				relatedEntityType === validRelatedEntityType,
		);

		if (!relationship) {
			throw Error("Invalid relationship for selected entity");
		}
	}
}

export const ValidateInstance = new Validate(new JSDOM().window);
