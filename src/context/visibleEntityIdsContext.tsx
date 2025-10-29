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
import { logError } from "@/utilities/log";
import { withServerSafetyHoc } from "./withServerSafetyHoc";

interface ContextType {
	visibleEntityIds: number[];
	setEntityContainerElement: (
		divContainerElement: HTMLDivElement,
		entityId: number,
	) => () => void;
}

const initialWeakMap = new WeakMap<HTMLDivElement, number>();
const initialContext = {
	visibleEntityIds: [],
	setEntityContainerElement: () => {
		return () => {};
	},
};

const VisibleEntityIdsContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
};

const ContextProvider = ({ children }: Props) => {
	const [visibleEntityIds, setVisibleEntityIds] = useState<number[]>([]);
	const divContainerElementsRef =
		useRef<WeakMap<HTMLDivElement, number>>(initialWeakMap);

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
	elements: WeakMap<HTMLDivElement, number>,
) =>
	entries.reduce(
		(acc, { isIntersecting, target }) => {
			const entityId = elements.get(target as HTMLDivElement);

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

const subtractArrays = (arr1: number[], arr2: number[]): number[] => {
	const sortedArr1: number[] = sort(arr1);
	const sortedArr2: number[] = sort(arr2);

	let i = 0;
	let j = 0;
	while (i < sortedArr1.length && j < sortedArr2.length) {
		const id1 = sortedArr1[i];
		const id2 = sortedArr2[j];

		if (id1 === id2) {
			delete sortedArr1[i];
			i += 1;
			j += 1;
		} else if (id1 < id2) {
			i += 1;
		} else {
			j += 1;
		}
	}

	return sortedArr1.filter(Boolean);
};

const sort = (arr: number[]) => arr.slice().sort((v1, v2) => v1 - v2);
