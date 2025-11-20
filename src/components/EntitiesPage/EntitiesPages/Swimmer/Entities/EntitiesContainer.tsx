"use client";

import type { PropsWithChildren } from "react";
import { useEntitiesContext } from "@/context";
import type { EntityType } from "@/server/types";
import { EntitiesContent } from "./EntitiesContent";

type Props = PropsWithChildren & {
	entityType: EntityType;
};

export const EntitiesContainer = ({ entityType }: Props) => {
	const { entities } = useEntitiesContext();
	return <EntitiesContent entityType={entityType} entities={entities} />;
};
