"use client";

import {
	type MouseEvent,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { useEntitiesContext } from "@/context";
import type { EntityType } from "@/server/types";

type Props = {
	entityType: EntityType;
	children: ReactNode;
};

export const LoadMore = ({ entityType }: Props) => {
	const { loadNextPage, nextPage, hasMore } = useEntitiesContext();
	const divRef = useLoadMoreOnVisible(loadNextPage);

	const _loadNextPage = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			loadNextPage();
			event.preventDefault();
		},
		[loadNextPage],
	);

	if (!hasMore) {
		return null;
	}

	return (
		<div className="mb-10" ref={divRef}>
			<a
				className="btn btn-sm"
				href={`/${entityType}?page=${nextPage}`}
				onClick={_loadNextPage}
			>
				Load more
			</a>
		</div>
	);
};

const useLoadMoreOnVisible = (loadNextPage: () => void) => {
	const divRef = useRef<HTMLDivElement>(null);

	const onIntersect = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadNextPage();
				}
			});
		},
		[loadNextPage],
	);

	useEffect(() => {
		const options = {
			rootMargin: "0px",
			threshold: 0.1,
		};

		const observer = new IntersectionObserver(onIntersect, options);
		if (divRef.current) observer.observe(divRef.current);

		return () => {
			observer.disconnect();
		};
	}, [onIntersect]);

	return divRef;
};
