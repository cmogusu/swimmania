import type { EntityData, EntityType } from "@/server/types";
import { getPlural } from "@/server/utils";
import { Entity } from "../Entity";

type Props = {
	entityType: EntityType;
	entities: EntityData[];
};

export const EntitiesContent = ({ entityType, entities }: Props) => {
	if (!entities) {
		return <h1>No {getPlural(entityType)} found</h1>;
	}

	return (
		<div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
			<table className="table">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Description</th>
						<th>Distance</th>
						<th>Stroke</th>
						<th>Gender</th>
						<th>Age group</th>
					</tr>
				</thead>
				<tbody>
					{entities.map((entity, itemPosition) => (
						<Entity
							key={entity.entityId}
							itemPosition={itemPosition + 1}
							entity={entity}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
