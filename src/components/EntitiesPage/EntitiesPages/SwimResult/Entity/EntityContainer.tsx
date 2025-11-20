"use client";

import type { PropsWithChildren } from "react";
import type { EntityData } from "@/server/types";
import { useLoadMetadata } from "../../../hooks";
import { EntityContent } from "./EntityContent";

type Props = PropsWithChildren & {
	entity: EntityData;
};

export const EntityContainer = ({ entity }: Props) => {
	const { entityType, entityId } = entity;
	const { isLoading: isMetadataLoading, metadata } = useLoadMetadata(
		entityType,
		entityId,
		false,
	);

	return (
		<EntityContent
			entity={entity}
			metadata={metadata}
			isMetadataLoading={isMetadataLoading}
		/>
	);
};
