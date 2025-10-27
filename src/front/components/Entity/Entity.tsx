import dynamic from "next/dynamic";
import { EntityContextProvider } from "@/front/context";
import type { EntityType } from "@/server/types";
import type { EntityProps } from "./EntityComponents/types";

type Component = React.ComponentType<EntityProps>;

const entityComponents: Record<EntityType, Component> = {
	parent: dynamic(() => import("./EntityComponents/Parent")),
	swimmer: dynamic(() => import("./EntityComponents/Swimmer")),
	school: dynamic(() => import("./EntityComponents/School")),
	pool: dynamic(() => import("./EntityComponents/Pool")),
	team: dynamic(() => import("./EntityComponents/Team")),
	coach: dynamic(() => import("./EntityComponents/Coach")),
	lifeguard: dynamic(() => import("./EntityComponents/Lifeguard")),
	swimMeet: dynamic(() => import("./EntityComponents/SwimMeet")),
	swimEvent: dynamic(() => import("./EntityComponents/SwimEvent")),
	swimResult: dynamic(() => import("./EntityComponents/SwimResult")),
};

export const Entity = async (props: EntityProps) => {
	const { entity, entityType } = props;

	if (!entity) {
		return "Oops!, item not found";
	}

	const EntityComponent = entityComponents[entityType];

	return (
		<EntityContextProvider entityId={entity.id} entityType={entityType}>
			<EntityComponent entity={entity} entityType={entityType} />
		</EntityContextProvider>
	);
};
