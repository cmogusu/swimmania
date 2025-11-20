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
};

export const EntityContainer = ({ entity }: Props) => {
	const { entityType, entityId } = entity;
	const divRef = useSetVisibleEntityOnScroll(entityId);
	const isVisible = useNotifyOnVisible(entityId);
	const { isLoading: isMetadataLoading, metadata } = useLoadMetadata(
		entityType,
		entityId,
		isVisible,
	);

	return (
		<div ref={divRef}>
			<EntityContent
				entity={entity}
				metadata={metadata}
				isMetadataLoading={isMetadataLoading}
			/>
		</div>
	);
};
