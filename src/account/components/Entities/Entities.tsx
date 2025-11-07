import { api } from "@/server/api";
import type { EntityData, EntityType } from "@/server/types";
import { Entity } from "./Entity";

type EntitiesProps = {
	entityType: EntityType;
	pageNumber: number;
};

export const Entities = async ({ entityType, pageNumber }: EntitiesProps) => {
	const { entities, nextPage, hasMore } =
		(await api.getEntities(entityType, pageNumber, true)) || {};

	if (!entities) {
		return <h1>oops! Error happened</h1>;
	}

	return (
		<div>
			<ul className="list rounded-box shadow-md mb-3">
				<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
					Top {entityType}
				</li>

				{entities.map((entity: EntityData) => (
					<Entity
						key={entity.entityId}
						entity={entity}
						entityType={entityType}
					/>
				))}
			</ul>
			<div>
				{pageNumber > 1 && (
					<a href={`/account/school/view?page=${pageNumber - 1}`}>
						{"<-"}Prev page{" "}
					</a>
				)}

				{hasMore && (
					<a href={`/account/school/view?page=${nextPage}`}>Next page {"->"}</a>
				)}
			</div>
		</div>
	);
};
