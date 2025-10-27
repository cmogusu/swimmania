"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import type { EntityLocation } from "@/types";
import { withServerSafetyHoc } from "./withServerSafetyHoc";

interface ContextType {
	entityLocations: EntityLocation[];
	setEntityLocation: (entityLocation: EntityLocation) => () => void;
}

const initialContext = {
	entityLocations: [],
	setEntityLocation: (_entityLocation: EntityLocation) => () => {},
};

const EntityLocationContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
	const [entityLocations, setEntityLocations] = useState<EntityLocation[]>([]);

	const setEntityLocation = useCallback((entityLocation: EntityLocation) => {
		setEntityLocations((prevLocations) => [...prevLocations, entityLocation]);

		return () => {
			setEntityLocations((prevLocations) =>
				prevLocations.filter((l) => l.entityId !== entityLocation.entityId),
			);
		};
	}, []);

	const context = useMemo(
		() => ({
			entityLocations,
			setEntityLocation,
		}),
		[entityLocations, setEntityLocation],
	);

	return (
		<EntityLocationContext value={context}>{children}</EntityLocationContext>
	);
};

export const useEntityLocationContext = () => useContext(EntityLocationContext);

export const EntityLocationContextProvider =
	withServerSafetyHoc(ContextProvider);
