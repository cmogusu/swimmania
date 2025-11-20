"use client";

import {
	createContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	useCallback,
	useContext,
	useMemo,
	useRef,
	useState,
} from "react";
import { subtractArrays } from "@/utilities/general";
import { logError } from "@/utilities/log";
import { withServerSafetyHoc } from "./withServerSafetyHoc";

interface IContextType {
	visibleEntityIds: number[];
	setEntityContainerElement: (
		entityId: number,
		divContainerElement: HTMLElement,
	) => () => void;
}

const initialWeakMap = new WeakMap<HTMLElement, number>();
const initialContext = {
	visibleEntityIds: [],
	setEntityContainerElement: () => {
		return () => {};
	},
};

const VisibleEntityIdsContext = createContext<IContextType>(initialContext);

type Props = {
	children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
	const [visibleEntityIds, setVisibleEntityIds] = useState<number[]>([]);
	const divContainerElementsRef =
		useRef<WeakMap<HTMLElement, number>>(initialWeakMap);

	const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
		const { added, removed } = getChangedEntityIds(
			entries,
			divContainerElementsRef.current,
		);
		updateState(setVisibleEntityIds, added, removed);
	}, []);

	const observer = useMemo(
		() =>
			new IntersectionObserver(onIntersect, {
				rootMargin: "0px",
				threshold: 0.5,
			}),
		[onIntersect],
	);

	const setEntityContainerElement = useCallback(
		(entityId: number, divContainerElement: HTMLElement) => {
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
			visibleEntityIds,
			setEntityContainerElement,
		}),
		[visibleEntityIds, setEntityContainerElement],
	);

	return (
		<VisibleEntityIdsContext value={context}>
			{children}
		</VisibleEntityIdsContext>
	);
};

export const useVisibleEntityIdsContext = () =>
	useContext(VisibleEntityIdsContext);

export const VisibleEntityIdsContextProvider =
	withServerSafetyHoc(ContextProvider);

const getChangedEntityIds = (
	entries: IntersectionObserverEntry[],
	elements: WeakMap<HTMLElement, number>,
) =>
	entries.reduce(
		(acc, { isIntersecting, target }) => {
			const entityId = elements.get(target as HTMLElement);

			if (!entityId) {
				logError("Container element not found");
				return acc;
			}

			if (isIntersecting) {
				acc.added.push(entityId);
			} else {
				acc.removed.push(entityId);
			}

			return acc;
		},
		{ added: [] as number[], removed: [] as number[] },
	);

const updateState = (
	setVisibleIds: Dispatch<SetStateAction<number[]>>,
	addedIds: number[],
	removedIds: number[],
) => {
	if (addedIds.length) {
		setVisibleIds((prevIds) => prevIds.concat(addedIds));
	}

	if (removedIds.length) {
		setVisibleIds((prevIds) => subtractArrays(prevIds, removedIds));
	}
};
