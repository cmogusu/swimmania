import { EntityRelationships } from "@/server/constants";
import type { EntityType, RelatedEntityRelationship } from "@/server/types";
import { BaseRelatedEntities } from "../BaseRelatedEntities";

type Props = {
	entityId: number;
	entityType: EntityType;
};

export const RelatedEntities = ({ entityId, entityType }: Props) => {
	const entityRelation = EntityRelationships[entityType];

	return entityRelation.map(
		([relationshipType, relatedEntityType]: RelatedEntityRelationship) => (
			<BaseRelatedEntities
				key={`${relationshipType}-${relatedEntityType}`}
				entityId={entityId}
				entityType={entityType}
				relationshipType={relationshipType}
				relatedEntityType={relatedEntityType}
			/>
		),
	);
};
