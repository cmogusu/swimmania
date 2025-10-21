import { api } from "@/server";
import type { EntityType, RelationshipType } from "@/server/types";
import { Entities } from "./Entities";
import { NonRelatedEntity } from "./NonRelatedEntity";
import { RelatedEntity } from "./RelatedEntity";
import { getNonRelatedEntities } from "./utils";

type Props = {
	entityId: number;
	entityType: EntityType;
	relatedEntityType: EntityType;
	relationshipType: RelationshipType;
};

export const BaseEditRelatedEntities = async ({
	entityId,
	entityType,
	relatedEntityType,
	relationshipType,
}: Props) => {
	const entitiesData = await api.getEntities(relatedEntityType);
	const relatedEntitiesData = await api.getRelatedEntities(
		entityType,
		entityId,
		relatedEntityType,
		relationshipType,
	);

	const { entities } = entitiesData || {};
	const { entities: relatedEntities } = relatedEntitiesData || {};
	const nonRelatedEntities = getNonRelatedEntities(entities, relatedEntities);

	return (
		<div className="grid grid-cols-2 gap-4">
			<Entities title="Non related">
				{nonRelatedEntities.map((entity) => (
					<NonRelatedEntity
						key={entity.id}
						entity={entity}
						entityId={entityId}
						entityType={entityType}
						relationshipType={relationshipType}
					/>
				))}
			</Entities>
			<Entities title="Related">
				{relatedEntities?.map((entity) => (
					<RelatedEntity
						key={entity.id}
						entity={entity}
						entityId={entityId}
						entityType={entityType}
						relationshipType={relationshipType}
					/>
				))}
			</Entities>
		</div>
	);
};
