"use client";

import {
	createContext,
	type ReactNode,
	type RefObject,
	useCallback,
	useContext,
	useMemo,
	useRef,
} from "react";

interface ContextType {
	inputRef: RefObject<HTMLInputElement | null>;

	toggleDrawer: () => void;
}

const initialContext = {
	inputRef: { current: null },
	toggleDrawer: () => {},
};

const EntityDrawerContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
};

export const EntityDrawerContextProvider = ({ children }: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const toggleDrawer = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.checked = !inputRef.current.checked;
		}
	}, []);

	const context = useMemo(
		() => ({
			toggleDrawer,
			inputRef,
		}),
		[toggleDrawer],
	);

	return <EntityDrawerContext value={context}>{children}</EntityDrawerContext>;
};

export const useEntityDrawerContext = () => useContext(EntityDrawerContext);
