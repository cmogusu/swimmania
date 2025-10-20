import { RelationshipDescriptions } from "@/server/constants";
import type { EntityData, EntityType, RelationshipType } from "@/server/types";
import { EntityCard } from "./EntityCard";

type Props = {
	entityType: EntityType;
	entities: EntityData[];
	relationshipType: RelationshipType;
};

export const Entities = ({ entityType, entities, relationshipType }: Props) => {
	const { getTitle } = RelationshipDescriptions[relationshipType];

	return (
		<section className="mb-4">
			<h2>{getTitle(entityType)}</h2>
			<div className="grid grid-cols-5 gap-2">
				{entities.map((entity) => (
					<EntityCard key={entity.id} entity={entity} />
				))}
			</div>
		</section>
	);
};
