import type { EntityData, EntityType } from "@/server/types";
import { Entity } from "../components/Entity";

type Props = {
	entity: EntityData | undefined;
	entityType: EntityType;
};

export const EntityPage = ({ entityType, entity }: Props) => {
	if (!entity) {
		return <div>Entity not found</div>;
	}

	return (
		<section className="mb-4">
			<Entity entity={entity} entityType={entityType} />
		</section>
	);
};
