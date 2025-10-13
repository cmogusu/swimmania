import type { EntitiesData, EntityType } from "@/server/types";
import { EntityCard, EntityCardList, LoadMore } from "../Entities/";
import { MapItem } from "../MapItem";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export const Section2 = async ({ entityType, entitiesData }: Props) => {
	const { entities, nextPage, hasMore } = entitiesData || {};

	if (!entities) {
		return <h1>oops! Error happened</h1>;
	}

	return (
		<section className="md:container mx-auto grid grid-cols-2 gap-4 w-full">
			<div className="col-start-1 col-end-2 ">
				<EntityCardList entityType={entityType}>
					<div>
						<h1>{entityType}</h1>
						{entities.map((entity) => (
							<EntityCard key={entity.id} entity={entity} />
						))}
					</div>
				</EntityCardList>
				{hasMore && (
					<LoadMore entityType={entityType}>
						<a className="btn btn-sm" href={`/${entityType}?page=${nextPage}`}>
							Load more
						</a>
					</LoadMore>
				)}
			</div>
			<div className="col-start-2 col-end-3 relative">
				<div className="sticky top-4">
					<MapItem />
				</div>
			</div>
		</section>
	);
};
