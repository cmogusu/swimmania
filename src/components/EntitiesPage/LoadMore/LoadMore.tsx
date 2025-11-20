import type { EntityType } from "@/server/types";
import { LoadMoreContainer } from "./LoadMoreContainer";
import { LoadMoreContent } from "./LoadMoreContent";

type Props = {
	entityType: EntityType;
	nextPage: number;
	hasMore: boolean;
};

export const LoadMore = ({ entityType, nextPage, hasMore }: Props) => (
	<LoadMoreContainer entityType={entityType}>
		<LoadMoreContent
			entityType={entityType}
			nextPage={nextPage}
			hasMore={hasMore}
		/>
	</LoadMoreContainer>
);
