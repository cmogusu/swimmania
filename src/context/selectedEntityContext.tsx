"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import type { EntityData } from "@/server/types";
import { useEntitiesContext } from "./entitiesContext";

interface ContextType {
	entity: EntityData | undefined;
	selectEntity: (entityId: number) => void;
}

const initialContext = {
	entity: undefined,
	selectEntity: () => {},
};

const SelectedEntityContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
};

export const SelectedEntityContextProvider = ({ children }: Props) => {
	const { entities } = useEntitiesContext();
	const [entity, setEntity] = useState<EntityData>();

	const selectEntity = useCallback(
		(entityId: number) => {
			if (!entityId) {
				throw Error("Entity id required");
			}

			const entity = entities.find((e) => e.entityId === entityId);
			if (!entity) {
				throw Error("Entity not found");
			}

			setEntity(entity);
		},
		[entities],
	);

	const context = useMemo(
		() => ({
			entity,
			selectEntity,
		}),
		[entity, selectEntity],
	);

	return (
		<SelectedEntityContext value={context}>{children}</SelectedEntityContext>
	);
};

export const useSelectedEntityContext = () => useContext(SelectedEntityContext);
