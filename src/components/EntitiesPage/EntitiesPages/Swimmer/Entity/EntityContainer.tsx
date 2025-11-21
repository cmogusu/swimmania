"use client";

import type { PropsWithChildren } from "react";
import type { EntityData } from "@/server/types";
import { useSetVisibleEntityOnScroll } from "../../../hooks";
import { EntityContent } from "./EntityContent";

type Props = PropsWithChildren & {
	entity: EntityData;
};

export const EntityContainer = ({ entity }: Props) => {
	const { entityId } = entity;
	const containerRef = useSetVisibleEntityOnScroll(entityId);

	return <EntityContent containerRef={containerRef} entity={entity} />;
};
