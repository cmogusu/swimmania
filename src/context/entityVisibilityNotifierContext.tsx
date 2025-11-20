"use client";

import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { useVisibleEntityIdsContext } from "./visibleEntityIdsContext";

type EntityVisibilityCallback = (v: boolean) => void;

interface IContextType {
	setEntityIsVisibleCallback: (
		entityId: number,
		setIsVisible: EntityVisibilityCallback,
	) => () => void;
}

const initialContext: IContextType = {
	setEntityIsVisibleCallback: () => () => {},
};

const Context = createContext<IContextType>(initialContext);

export const EntityVisibilityNotifierContextProvider = (
	props: PropsWithChildren,
) => {
	const visibilityCallbacksRef = useRef<
		Record<string, EntityVisibilityCallback>
	>({});
	const { visibleEntityIds } = useVisibleEntityIdsContext();

	useEffect(() => {
		visibleEntityIds.map((id) => {
			visibilityCallbacksRef.current[id](true);
		});
	}, [visibleEntityIds]);

	const setEntityIsVisibleCallback = useCallback(
		(entityId: number, setIsVisible: EntityVisibilityCallback) => {
			visibilityCallbacksRef.current[entityId] = setIsVisible;
			return () => {
				delete visibilityCallbacksRef.current[entityId];
			};
		},
		[],
	);

	const context = useMemo(
		() => ({
			setEntityIsVisibleCallback,
		}),
		[setEntityIsVisibleCallback],
	);

	return <Context value={context}>{props.children}</Context>;
};

export const useEntityVisibilityNotifierContext = () => useContext(Context);
