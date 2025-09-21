"use client";

import type { JSX } from "react";
import { useEntitiesContext } from "@/front/context";
import type { EntityType } from "@/server";
import { EntityCard } from "./EntityCard";
import { Loading } from "./Loading";

type Props = {
	entityType: EntityType;
	children: JSX.Element;
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
