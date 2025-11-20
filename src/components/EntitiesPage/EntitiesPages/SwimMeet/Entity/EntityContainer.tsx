"use client";

import type { PropsWithChildren } from "react";
import type { EntityData } from "@/server/types";
import {
	useLoadMetadata,
	useNotifyOnVisible,
	useSetVisibleEntityOnScroll,
} from "../../../hooks";
import { EntityContent } from "./EntityContent";

type Props = PropsWithChildren & {
	entity: EntityData;
	itemPosition: number;
};

export const EntityContainer = ({ entity, itemPosition }: Props) => {
	const { entityType, entityId } = entity;
	const containerRef = useSetVisibleEntityOnScroll(entityId);
	const isVisible = useNotifyOnVisible(entityId);
	const { isLoading: isMetadataLoading, metadata } = useLoadMetadata(
		entityType,
		entityId,
		isVisible,
	);

	return (
		<EntityContent
			containerRef={containerRef}
			entity={entity}
			itemPosition={itemPosition}
			metadata={metadata}
			isMetadataLoading={isMetadataLoading}
		/>
	);
};
