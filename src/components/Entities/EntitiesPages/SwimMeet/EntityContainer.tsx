"use client";

import type { PropsWithChildren } from "react";
import type { EntityData } from "@/server/types";
import {
	useLoadMetadata,
	useSetEntityLocation,
	useSetVisibleEntityOnScroll,
	useShowDrawerOnEntityClick,
} from "../../hooks";
import { EntityContent } from "./EntityContent";

type Props = PropsWithChildren & {
	entity: EntityData;
};

export default function EntityContainer({ entity }: Props) {
	const { entityType, entityId } = entity;
	const divRef = useSetVisibleEntityOnScroll(entityId);
	const handleButtonClick = useShowDrawerOnEntityClick(entityId);
	const metadata = useLoadMetadata(entityType, entityId);
	useSetEntityLocation(entityId, metadata);

	return (
		<div ref={divRef}>
			<EntityContent
				entity={entity}
				metadata={metadata}
				handleButtonClick={handleButtonClick}
			/>
		</div>
	);
}
