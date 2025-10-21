import { removeRelatedEntity } from "@/server/api/apiActions";
import type { EntityData, EntityType, RelationshipType } from "@/server/types";
import { EntityCard } from "./EntityCard";
import { EntityForm } from "./EntityForm";

type Props = {
	entity: EntityData;
	entityType: EntityType;
	entityId: number;
	relationshipType: RelationshipType;
};

export const RelatedEntity = ({
	entity,
	entityType,
	entityId,
	relationshipType,
}: Props) => {
	return (
		<EntityCard entity={entity}>
			<EntityForm
				entity={entity}
				entityId={entityId}
				entityType={entityType}
				relationshipType={relationshipType}
				formAction={removeRelatedEntity}
				buttonText="Remove"
			/>
		</EntityCard>
	);
};
