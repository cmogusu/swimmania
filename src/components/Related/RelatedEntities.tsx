import type { EntityData, EntityType } from "@/server/types";
import { EntityCard } from "./EntityCard";

type Props = {
	entityType: EntityType;
	entities: EntityData[];
};

export const RelatedEntities = ({ entityType, entities }: Props) => {
	return (
		<section>
			<h2>Related {entityType}</h2>
			<div className="grid grid-cols-5 gap-2">
				{entities.map((entity) => (
					<EntityCard key={entity.id} entity={entity} />
				))}
			</div>
		</section>
	);
};
