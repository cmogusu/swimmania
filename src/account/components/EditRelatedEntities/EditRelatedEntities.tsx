import { EntityRelationships } from "@/server/constants";
import type { EntityType, RelatedEntityRelationship } from "@/server/types";
import { BaseEditRelatedEntities } from "../BaseEditRelatedEntities";

type Props = {
	entityId: number;
	entityType: EntityType;
};

export const EditRelatedEntities = ({ entityId, entityType }: Props) => {
	const entityRelation = EntityRelationships[entityType];

	return entityRelation.map(
		([relationshipType, relatedEntityType]: RelatedEntityRelationship) => (
			<BaseEditRelatedEntities
				key={`${relationshipType}-${relatedEntityType}`}
				entityId={entityId}
				entityType={entityType}
				relationshipType={relationshipType}
				relatedEntityType={relatedEntityType}
			/>
		),
	);
};
