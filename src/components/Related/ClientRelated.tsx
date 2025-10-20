"use client";

import { Suspense, use } from "react";
import { useEntityContext } from "@/front/context";
import { api } from "@/server/api";
import type { RelationshipType } from "@/server/Managers/RelatedEntityIdManager/types";
import type { EntityType } from "@/server/types";
import { Loading } from "../Loading";
import { EntityCard } from "./EntityCard";

type Props = {
	relatedEntityType: EntityType;
	relationshipType: RelationshipType;
};

export const Related = ({ relatedEntityType, relationshipType }: Props) => {
	const { entityId, entityType } = useEntityContext();
	const response = use(
		api.getRelatedEntities(
			entityType,
			entityId,
			relatedEntityType,
			relationshipType,
		),
	);

	const { entities } = response || {};

	return (
		<Suspense fallback={<Loading />}>
			{entities?.map((entity) => (
				<EntityCard key={entity.id} {...entity} />
			))}
		</Suspense>
	);
};
