"use client";

import {
	createContext,
	type ReactNode,
	type RefObject,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
} from "react";
import { useSelectedEntityContext } from "./selectedEntityContext";

interface ContextType {
	inputRef: RefObject<HTMLInputElement | null>;
	openDrawer: () => void;
	closeDrawer: () => void;
}

const initialContext = {
	inputRef: { current: null },
	openDrawer: () => {},
	closeDrawer: () => {},
};

const EntityDrawerContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
};

export const EntityDrawerContextProvider = ({ children }: Props) => {
	const { entity, selectEntity } = useSelectedEntityContext();
	const inputRef = useRef<HTMLInputElement>(null);

	const openDrawer = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.checked = true;
		}
	}, []);

	const closeDrawer = useCallback(() => {
		if (inputRef.current) {
			selectEntity();
			inputRef.current.checked = false;
		}
	}, [selectEntity]);

	useEffect(() => {
		if (entity) {
			openDrawer();
		}
	}, [entity, openDrawer]);

	const context = useMemo(
		() => ({
			openDrawer,
			closeDrawer,
			inputRef,
		}),
		[openDrawer, closeDrawer],
	);

	return <EntityDrawerContext value={context}>{children}</EntityDrawerContext>;
};

export const useEntityDrawerContext = () => useContext(EntityDrawerContext);
