"use client";

import type { PropsWithChildren } from "react";
import type { EntityData } from "@/server/types";
import {
	useSetEntityLocation,
	useSetVisibleEntityOnScroll,
	useShowDrawerOnEntityClick,
} from "../../../hooks";
import { EntityContent } from "./EntityContent";

type Props = PropsWithChildren & {
	entity: EntityData;
};

export const EntityContainer = ({ entity }: Props) => {
	const { entityId, metadata } = entity;
	const containerRef = useSetVisibleEntityOnScroll(entityId);

	const handleButtonClick = useShowDrawerOnEntityClick(entityId);
	useSetEntityLocation(entityId, metadata);

	return (
		<EntityContent
			containerRef={containerRef}
			entity={entity}
			handleButtonClick={handleButtonClick}
		/>
	);
};
