import { Suspense } from "react";
import { api } from "@/server/api";
import type {
	EntitiesData,
	EntityType,
	RelationshipType,
} from "@/server/types";
import { Loading } from "../Loading";
import { RelatedEntities } from "./RelatedEntities";

type Props = {
	entityId: number;
	entityType: EntityType;
	relatedEntityType: EntityType;
	relationshipType: RelationshipType;
};

export const Related = async ({
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
				<RelatedEntities entities={entities} entityType={relatedEntityType} />
			) : null}
		</Suspense>
	);
};
