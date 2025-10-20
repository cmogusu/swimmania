import { Suspense } from "react";
import { api } from "@/server/api";
import type {
	EntitiesData,
	EntityType,
	RelationshipType,
} from "@/server/types";
import { Loading } from "../Loading";
import { Entities } from "./Entities";

type Props = {
	entityId: number;
	entityType: EntityType;
	relatedEntityType: EntityType;
	relationshipType: RelationshipType;
};

export const BaseRelatedEntities = async ({
	entityId,
	entityType,
	relatedEntityType,
	relationshipType,
}: Props) => {
	const entitiesData: EntitiesData = await api.getRelatedEntities(
		entityType,
		entityId,
		relatedEntityType,
		relationshipType,
	);

	const { entities } = entitiesData || {};

	return (
		<Suspense fallback={<Loading />}>
			{entities?.length ? (
				<Entities entities={entities} entityType={relatedEntityType} />
			) : null}
		</Suspense>
	);
};
