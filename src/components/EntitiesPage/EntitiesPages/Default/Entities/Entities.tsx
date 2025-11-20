import type { EntitiesData, EntityType } from "@/server/types";
import { LoadMore } from "../../../LoadMore";
import { EntitiesContainer } from "./EntitiesContainer";
import { EntitiesContent } from "./EntitiesContent";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export const Entities = ({ entityType, entitiesData }: Props) => {
	const { entities, nextPage, hasMore } = entitiesData || {};

	return (
		<div>
			<EntitiesContainer entityType={entityType}>
				<EntitiesContent entityType={entityType} entities={entities} />
			</EntitiesContainer>

			<LoadMore entityType={entityType} nextPage={nextPage} hasMore={hasMore} />
		</div>
	);
};
