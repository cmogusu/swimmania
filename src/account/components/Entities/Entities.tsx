import type { EntityData, EntityType } from "@/server";
import { api } from "@/server";
import { Entity } from "./Entity";

type EntitiesProps = {
	entityType: EntityType;
};

export const Entities = async ({ entityType }: EntitiesProps) => {
	const { entities } = (await api.getEntities(entityType)) || {};

	if (!entities) {
		return <h1>oops! Error happened</h1>;
	}

	return (
		<ul className="list rounded-box shadow-md">
			<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
				Top {entityType}
			</li>

			{entities.map((entity: EntityData) => (
				<Entity key={entity.id} entity={entity} entityType={entityType} />
			))}
		</ul>
	);
};
