"use client";

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useMemo,
} from "react";
import type { EntityType } from "@/server/types";

type EntityContext = {
	entityId: number;
	entityType: EntityType;
};

const initialContext: EntityContext = {
	entityId: -1,
	entityType: "coach",
};

const EntityContext = createContext<EntityContext>(initialContext);

type Props = PropsWithChildren & {
	entityId: number;
	entityType: EntityType;
};

export const EntityContextProvider = (props: Props) => {
	const { entityId, entityType } = props;
	const context = useMemo(
		() => ({
			entityId,
			entityType,
		}),
		[entityId, entityType],
	);

	return <EntityContext value={context}>{props.children}</EntityContext>;
};

export const useEntityContext = () => useContext(EntityContext);
