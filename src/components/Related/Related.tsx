"use client";

import { Suspense, use } from "react";
import { useEntityContext } from "@/front/context";
import { api } from "@/server/api";
import type { EntityType } from "@/server/types";
import { Loading } from "../Loading";
import { EntityCard } from "./EntityCard";

type Props = {
	relatedEntityType: EntityType;
};

export const Related = ({ relatedEntityType }: Props) => {
	const { entityId, entityType } = useEntityContext();
	const { entities } = use(
		api.getRelatedEntities(entityType, entityId, relatedEntityType),
	);

	return (
		<Suspense fallback={<Loading />}>
			{entities?.map((entity) => (
				<EntityCard key={entity.id} {...entity} />
			))}
		</Suspense>
	);
};
