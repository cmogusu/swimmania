"use client";

import type { ReactNode } from "react";
import { Loading } from "@/components/Loading";
import { useEntitiesContext } from "@/front/context";
import type { EntityType } from "@/server/types";
import { EntityCard } from "./EntityCard";

type Props = {
	entityType: EntityType;
	children: ReactNode;
};

export const EntityCardList = ({ entityType }: Props) => {
	const { entities } = useEntitiesContext();

	return (
		<div>
			<h1>{entityType}</h1>
			{entities.map((entity) => (
				<EntityCard key={entity.id} entity={entity} />
			))}
			<Loading />
		</div>
	);
};
