"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import type { EntityLatLng } from "@/types";
import { withServerSafetyHoc } from "./withServerSafetyHoc";

interface ContextType {
	entityLocations: EntityLatLng[];
	setEntityLocation: (entityLocation: EntityLatLng) => () => void;
}

const initialContext = {
	entityLocations: [],
	setEntityLocation: (_entityLocation: EntityLatLng) => () => {},
};

const EntityLocationContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
	const [entityLocations, setEntityLocations] = useState<EntityLatLng[]>([]);

	const setEntityLocation = useCallback((entityLocation: EntityLatLng) => {
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
