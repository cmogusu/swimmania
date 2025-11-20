import type { EntityData } from "@/server/types";
import EntityContainer from "./EntityContainer";
import { EntityContent } from "./EntityContent";

type EntityProps = {
	entity: EntityData;
};

export function Entity({ entity }: EntityProps) {
	return (
		<EntityContainer entity={entity}>
			<EntityContent entity={entity} />
		</EntityContainer>
	);
}
