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
	swimMeet: dynamic(
		() => import("./EntitiesPages/SwimMeet/PageLayout/PageLayout"),
	),
	swimEvent: dynamic(
		() => import("./EntitiesPages/SwimEvent/PageLayout/PageLayout"),
	),
	swimResult: dynamic(
		() => import("./EntitiesPages/SwimResult/PageLayout/PageLayout"),
	),
};

export const EntitiesPage = ({ entityType, entitiesData }: Props) => {
	const EntitiesPageComponent =
		entitiesPageComponents[entityType] || DefaultEntitiesComponent;

	return (
		<EntitiesPageComponent
			entitiesData={entitiesData}
			entityType={entityType}
		/>
	);
};
