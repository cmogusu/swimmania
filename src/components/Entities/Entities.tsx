import dynamic from "next/dynamic";
import type { EntitiesData, EntityType } from "@/server/types";

type Props = {
	entityType: EntityType;
	entitiesData: EntitiesData;
};

const DefaultEntitiesComponent = dynamic(
	() => import("./EntityComponents/Default/Entities"),
);

type EntitiesComponents = React.ComponentType<Props>;
const entitiesComponents: Record<string, EntitiesComponents> = {
	swimMeet: dynamic(() => import("./EntityComponents/SwimMeet/Entities")),
};

export const Entities = ({ entityType, entitiesData }: Props) => {
	const EntitiesComponents =
		entitiesComponents[entityType] || DefaultEntitiesComponent;

	return (
		<EntitiesComponents entitiesData={entitiesData} entityType={entityType} />
	);
};
