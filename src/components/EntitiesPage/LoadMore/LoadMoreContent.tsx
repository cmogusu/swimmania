import type { MouseEvent, RefObject } from "react";
import type { EntityType } from "@/server/types";

type Props = {
	entityType: EntityType;
	nextPage: number;
	hasMore: boolean;
	divRef?: RefObject<HTMLDivElement | null>;
	handleLoadNextPage?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const LoadMoreContent = ({
	entityType,
	nextPage,
	hasMore,
	divRef,
	handleLoadNextPage,
}: Props) => {
	const currentPage = nextPage - 1;

	return (
		<div className="mb-10" ref={divRef}>
			<noscript>
				{currentPage > 1 && (
					<a
						className="btn btn-sm"
						href={`/${entityType}?page=${currentPage - 1}`}
					>
						{"<"}Prev page{" "}
					</a>
				)}

				{hasMore && (
					<a
						className="btn btn-sm"
						href={`/${entityType}?page=${nextPage}`}
						onClick={handleLoadNextPage}
					>
						Next page {">"}
					</a>
				)}
			</noscript>
		</div>
	);
};
