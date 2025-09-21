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
import { logError } from "@/utilities/log";
import { withServerSafetyHoc } from "./withServerSafetyHoc";

interface ContextType {
	visibleEntityIdsRef: RefObject<Set<number>>;
	setEntityContainerElement: (
		divContainerElement: HTMLDivElement,
		entityId: number,
	) => () => void;
}

const initialSet = new Set<number>();
const initialWeakMap = new WeakMap<HTMLDivElement, number>();
const initialContext = {
	visibleEntityIdsRef: { current: new Set<number>() },
	setEntityContainerElement: () => {
		return () => {};
	},
};

const EntityScrollObserverContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
};

export const ContextProvider = ({ children }: Props) => {
	const visibleEntityIdsRef = useRef<Set<number>>(initialSet);
	const divContainerElementsRef =
		useRef<WeakMap<HTMLDivElement, number>>(initialWeakMap);

	const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
		const visibleIds = visibleEntityIdsRef.current;
		entries.forEach(({ isIntersecting, target }) => {
			const entityId = divContainerElementsRef.current.get(
				target as HTMLDivElement,
			);

			if (!entityId) {
				logError("Container element not found");
				return;
			}

			if (isIntersecting) {
				visibleIds.add(entityId);
			} else if (visibleIds.has(entityId)) {
				visibleIds.delete(entityId);
			}
		});
	}, []);

	const observer = useMemo(
		() =>
			new IntersectionObserver(onIntersect, {
				rootMargin: "0px",
				threshold: 1,
			}),
		[onIntersect],
	);

	const setEntityContainerElement = useCallback(
		(divContainerElement: HTMLDivElement, entityId: number) => {
			observer.observe(divContainerElement);
			divContainerElementsRef.current.set(divContainerElement, entityId);

			return () => {
				observer.unobserve(divContainerElement);
				divContainerElementsRef.current.delete(divContainerElement);
			};
		},
		[observer],
	);

	const context = useMemo(
		() => ({
			visibleEntityIdsRef,
			setEntityContainerElement,
		}),
		[setEntityContainerElement],
	);

	return (
		<EntityScrollObserverContext value={context}>
			{children}
		</EntityScrollObserverContext>
	);
};

export const useEntityScrollObserverContext = () =>
	useContext(EntityScrollObserverContext);

export const EntityScrollObserverContextProvider =
	withServerSafetyHoc(ContextProvider);
