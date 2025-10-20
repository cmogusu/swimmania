import { EntityTypePlurals } from "@/server/constants";
import type { EntityData, EntityType } from "@/server/types";
import { EntityCard } from "./EntityCard";

type Props = {
	entityType: EntityType;
	entities: EntityData[];
};

export const Entities = ({ entityType, entities }: Props) => {
	return (
		<section className="mb-4">
			<h2>Related {EntityTypePlurals[entityType]}</h2>
			<div className="grid grid-cols-5 gap-2">
				{entities.map((entity) => (
					<EntityCard key={entity.id} entity={entity} />
				))}
			</div>
		</section>
	);
};
