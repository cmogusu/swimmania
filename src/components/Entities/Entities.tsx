import dynamic from "next/dynamic";
import type { EntitiesData, EntityType } from "@/server/types";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

const DefaultEntitiesComponent = dynamic(
	() => import("./EntitiesPages/Default/PageLayout/PageLayout"),
);

const entitiesPageComponents: Record<string, React.ComponentType<Props>> = {
	swimMeet: dynamic(() => import("./EntitiesPages/SwimMeet/Entities")),
};

export const Entities = ({ entityType, entitiesData }: Props) => {
	const EntitiesPageComponent =
		entitiesPageComponents[entityType] || DefaultEntitiesComponent;

	return (
		<EntitiesPageComponent
			entitiesData={entitiesData}
			entityType={entityType}
		/>
	);
};
