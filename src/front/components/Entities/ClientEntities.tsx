"use client";

import type { ReactNode } from "react";
import { useEntitiesContext } from "@/front/context";
import { EntityCard } from "./EntityCard";

type Props = {
	children: ReactNode;
};

export const ClientEntities = (_props: Props) => {
	const { entities } = useEntitiesContext();

	return entities.map((entity) => (
		<EntityCard key={entity.id} entity={entity} />
	));
};
