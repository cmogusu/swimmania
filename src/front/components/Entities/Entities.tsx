import type { EntitiesData, EntityType } from "@/server/types";
import { ClientEntities } from "./ClientEntities";
import { EntityCard } from "./EntityCard";
import { LoadMore } from "./LoadMore";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export const Entities = ({ entityType, entitiesData }: Props) => {
	const { entities, nextPage, hasMore } = entitiesData || {};

	if (!entities) {
		return <h1>oops! Error happened</h1>;
	}

	return (
		<div>
			<ClientEntities>
				{entities.map((entity) => (
					<EntityCard key={entity.id} entity={entity} />
				))}
			</ClientEntities>

			{hasMore && (
				<LoadMore entityType={entityType}>
					<a className="btn btn-sm" href={`/${entityType}?page=${nextPage}`}>
						Load more
					</a>
				</LoadMore>
			)}
		</div>
	);
};
