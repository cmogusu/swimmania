import type { EntitiesData, EntityType } from "@/server/types";
import { Entities } from "../components/Entities";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

export const EntitiesPage = ({ entityType, entitiesData }: Props) => {
	return (
		<div>
			<h1>{entityType}</h1>
			<Entities entityType={entityType} entitiesData={entitiesData} />
		</div>
	);
};
