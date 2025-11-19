"use client";

import { type MouseEvent, type PropsWithChildren, useCallback } from "react";
import { useEntitiesContext } from "@/context";
import type { EntityType } from "@/server/types";
import { LoadMoreContent } from "./LoadMoreContent";
import { useLoadMoreOnVisible } from "./useLoadMoreOnVisible";

type Props = PropsWithChildren & {
	entityType: EntityType;
};

export const LoadMoreContainer = ({ entityType }: Props) => {
	const { loadNextPage, nextPage, hasMore } = useEntitiesContext();
	const divRef = useLoadMoreOnVisible(loadNextPage);

	const handleLoadNextPage = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			loadNextPage();
			event.preventDefault();
		},
		[loadNextPage],
	);

	return (
		<LoadMoreContent
			entityType={entityType}
			hasMore={hasMore}
			divRef={divRef}
			nextPage={nextPage}
			handleLoadNextPage={handleLoadNextPage}
		/>
	);
};
