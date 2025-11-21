import type { EntityData } from "@/server/types";
import { EntityContainer } from "./EntityContainer";
import { EntityContent } from "./EntityContent";

type EntityProps = {
	entity: EntityData;
	itemPosition: number;
};

export const Entity = ({ entity, itemPosition }: EntityProps) => (
	<EntityContainer entity={entity} itemPosition={itemPosition}>
		<EntityContent entity={entity} itemPosition={itemPosition} />
	</EntityContainer>
);
