"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from "react";
import { logError } from "@/utilities/log";

interface ContextType {
	toggleDrawer: () => void;
	setDrawerInputId: (id: string) => void;
}

const initialContext = {
	toggleDrawer: () => {},
	setDrawerInputId: () => {},
};

const EntityDrawerContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
};

export const EntityDrawerContextProvider = ({ children }: Props) => {
	const [drawerInputId, setDrawerInputId] = useState<string>("");
	const inputRef = useRef<HTMLInputElement>(null);
	inputRef.current = useInputElement(drawerInputId);

	const toggleDrawer = useCallback(() => {
		if (inputRef.current) {
			inputRef.current.checked = !inputRef.current.checked;
		}
	}, []);

	const context = useMemo(
		() => ({
			toggleDrawer,
			setDrawerInputId,
		}),
		[toggleDrawer],
	);

	return <EntityDrawerContext value={context}>{children}</EntityDrawerContext>;
};

export const useEntityDrawerContext = () => useContext(EntityDrawerContext);

const useInputElement = (drawerInputId: string) =>
	useMemo(() => {
		if (!drawerInputId) {
			return null;
		}

		const el = document.getElementById(drawerInputId);
		if (!el) {
			logError("Drawer id not set");
			return null;
		}

		return el as HTMLInputElement;
	}, [drawerInputId]);
