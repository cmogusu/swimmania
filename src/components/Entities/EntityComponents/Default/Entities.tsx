import type { EntitiesData, EntityType } from "@/server/types";
import { getPlural } from "@/server/utils";
import { LoadMore } from "../../LoadMore";
import { Entity } from "./Entity";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export default function Entities({ entityType, entitiesData }: Props) {
	const { entities, nextPage, hasMore } = entitiesData || {};

	if (!entities) {
		return <h1>No {getPlural(entityType)} found</h1>;
	}

	return (
		<div>
			{entities.map((entity) => (
				<Entity key={entity.entityId} entity={entity} />
			))}

			<LoadMore entityType={entityType} nextPage={nextPage} hasMore={hasMore} />
		</div>
	);
}
