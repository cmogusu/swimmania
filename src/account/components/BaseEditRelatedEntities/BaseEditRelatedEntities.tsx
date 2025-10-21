import { api } from "@/server/api";
import {
	EntityTypePlurals,
	RelationshipDescriptions,
} from "@/server/constants";
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

	const { getTitle } = RelationshipDescriptions[relationshipType];
	const { entities } = entitiesData || {};
	const { entities: relatedEntities } = relatedEntitiesData || {};
	const nonRelatedEntities = getNonRelatedEntities(entities, relatedEntities);

	return (
		<section className="mb-4">
			<h2>{getTitle(relatedEntityType)}</h2>
			<div className="grid grid-cols-2 gap-4 border p-4 border-gray-300 bg-gray-200">
				<Entities
					title={`All ${EntityTypePlurals[relatedEntityType]}`}
					className=""
				>
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
				<Entities title={`Linked ${EntityTypePlurals[relatedEntityType]}`}>
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
		</section>
	);
};
