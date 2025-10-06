"use client";

import { useSearchParams } from "next/navigation";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import { getEntities } from "@/server/api/apiActions";
import type { EntitiesData, EntityData, EntityType } from "@/server/types";

interface ContextType {
	entities: EntityData[];
	isLoading: boolean;
	hasMore: boolean;
	nextPage: number;
	loadNextPage: () => void;
}

const initialContext = {
	entities: [],
	isLoading: false,
	hasMore: false,
	nextPage: 2,
	loadNextPage: () => {},
};

const EntitiesContext = createContext<ContextType>(initialContext);

type Props = {
	children: ReactNode;
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export const EntitiesContextProvider = ({
	entityType,
	entitiesData,
	children,
}: Props) => {
	const {
		entities: initialEntities = [],
		nextPage: initialNextPage = 2,
		hasMore: initialHasMore = false,
	} = entitiesData || {};
	const [entities, setEntities] = useState<EntityData[]>(initialEntities);
	const [nextPage, setNextPage] = useState<number>(initialNextPage);
	const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const updatePage = useGetUpdatePageFn();

	const loadNextPage = useCallback(() => {
		if (!hasMore || isLoading) {
			return;
		}

		setIsLoading(true);
		getEntities(entityType, nextPage)
			.then(({ entities, nextPage, hasMore }: EntitiesData) => {
				setEntities((prevEntities) => prevEntities.concat(entities));
				setNextPage(nextPage);
				setHasMore(hasMore);
				setIsLoading(false);
				updatePage(nextPage - 1);
			})
			.catch((e) => {
				console.error(e);
				setIsLoading(false);
			});
	}, [entityType, nextPage, hasMore, isLoading, updatePage]);

	const context = useMemo(
		() => ({
			entities,
			isLoading,
			hasMore,
			nextPage,
			loadNextPage,
		}),
		[entities, isLoading, hasMore, nextPage, loadNextPage],
	);

	return <EntitiesContext value={context}>{children}</EntitiesContext>;
};

export const useEntitiesContext = () => useContext(EntitiesContext);

const useGetUpdatePageFn = () => {
	const searchParams = useSearchParams();

	const updatePage = useCallback(
		(page: number) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set("page", `${page}`);
			window.history.pushState({}, "", `?${params.toString()}`);
		},
		[searchParams],
	);

	return updatePage;
};
