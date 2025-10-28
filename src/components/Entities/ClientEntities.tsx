"use client";

import type { ReactNode } from "react";
import { useEntitiesContext } from "@/context";
import type { EntityType } from "@/server/types";
import { Entity } from "./Entity";

type Props = {
	children: ReactNode;
	entityType: EntityType;
};

export const ClientEntities = ({ entityType }: Props) => {
	const { entities } = useEntitiesContext();

	return entities.map((entity) => (
		<Entity key={entity.id} entity={entity} entityType={entityType} />
	));
};
