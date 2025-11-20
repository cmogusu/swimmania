import type { EntityData, EntityType } from "@/server/types";
import { getPlural } from "@/server/utils";
import { Entity } from "../Entity";

type Props = {
	entityType: EntityType;
	entities: EntityData[];
};

export const EntitiesContent = ({ entityType, entities }: Props) => {
	if (!entities) {
		return <h1>No {getPlural(entityType)} found</h1>;
	}

	return (
		<ul className="list bg-base-100 rounded-box shadow-md">
			{entities.map((entity) => (
				<Entity key={entity.entityId} entity={entity} />
			))}
		</ul>
	);
};
