import type { EntityData, EntityType } from "@/server/types";
import { EntitiesContainer } from "./EntitiesContainer";
import { EntitiesContent } from "./EntitiesContent";

type Props = {
	entityType: EntityType;
	entities: EntityData[];
};

export const Entities = ({ entityType, entities }: Props) => (
	<EntitiesContainer entityType={entityType}>
		<EntitiesContent entityType={entityType} entities={entities} />
	</EntitiesContainer>
);
