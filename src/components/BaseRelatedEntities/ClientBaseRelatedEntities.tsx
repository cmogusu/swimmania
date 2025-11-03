import { useEffect, useState } from "react";
import { getRelatedEntities } from "@/server/api";
import type { EntityData, EntityType, RelationshipType } from "@/server/types";
import { Entities } from "./Entities";

type Props = {
	entityId: number;
	entityType: EntityType;
	relatedEntityType: EntityType;
	relationshipType: RelationshipType;
};

export const ClientBaseRelatedEntities = ({
	entityId,
	entityType,
	relatedEntityType,
	relationshipType,
}: Props) => {
	const [entities, setEntities] = useState<EntityData[]>();

	useEffect(() => {
		getRelatedEntities(
			entityType,
			entityId,
			relatedEntityType,
			relationshipType,
		)
			.then((e) => e?.entities)
			.then(setEntities)
			.catch((e) => {
				console.log(e.message);
			});
	}, [entityType, entityId, relatedEntityType, relationshipType]);

	if (!entities?.length) {
		return null;
	}

	return (
		<Entities
			entities={entities}
			entityType={relatedEntityType}
			relationshipType={relationshipType}
		/>
	);
};
