import dynamic from "next/dynamic";
import { EntitiesMetadataList } from "@/server/constants";
import type { EntityData, EntityType, RawMetadata } from "@/server/types";
import type { EntityProps, MetadataProps } from "./EntityComponents/types";
import { EntityContainer } from "./EntityContainer";
import { EntityMetadataList } from "./EntityMetadataList";

export type Props = {
	entity: EntityData;
	entityType: EntityType;
};

type EntityComponentType = React.ComponentType<EntityProps>;
const entityComponents: Record<EntityType, EntityComponentType> = {
	parent: dynamic(() => import("./EntityComponents/Parent/Entity")),
	swimmer: dynamic(() => import("./EntityComponents/Swimmer/Entity")),
	school: dynamic(() => import("./EntityComponents/School/Entity")),
	pool: dynamic(() => import("./EntityComponents/Pool/Entity")),
	team: dynamic(() => import("./EntityComponents/Team/Entity")),
	coach: dynamic(() => import("./EntityComponents/Coach/Entity")),
	lifeguard: dynamic(() => import("./EntityComponents/Lifeguard/Entity")),
	swimMeet: dynamic(() => import("./EntityComponents/SwimMeet/Entity")),
	swimEvent: dynamic(() => import("./EntityComponents/SwimEvent/Entity")),
	swimResult: dynamic(() => import("./EntityComponents/SwimResult/Entity")),
	user: dynamic(() => import("./EntityComponents/User/Entity")),
	comment: dynamic(() => import("./EntityComponents/Pool/Entity")),
	rating: dynamic(() => import("./EntityComponents/Pool/Entity")),
};

type MetadataComponentType = React.ComponentType<MetadataProps>;
const metadataComponents: Record<EntityType, MetadataComponentType> = {
	parent: dynamic(() => import("./EntityComponents/Parent/Metadata")),
	swimmer: dynamic(() => import("./EntityComponents/Swimmer/Metadata")),
	school: dynamic(() => import("./EntityComponents/School/Metadata")),
	pool: dynamic(() => import("./EntityComponents/Pool/Metadata")),
	team: dynamic(() => import("./EntityComponents/Team/Metadata")),
	coach: dynamic(() => import("./EntityComponents/Coach/Metadata")),
	lifeguard: dynamic(() => import("./EntityComponents/Lifeguard/Metadata")),
	swimMeet: dynamic(() => import("./EntityComponents/SwimMeet/Metadata")),
	swimEvent: dynamic(() => import("./EntityComponents/SwimEvent/Metadata")),
	swimResult: dynamic(() => import("./EntityComponents/SwimResult/Metadata")),
	user: dynamic(() => import("./EntityComponents/User/Metadata")),
	comment: dynamic(() => import("./EntityComponents/User/Metadata")),
	rating: dynamic(() => import("./EntityComponents/User/Metadata")),
};

export const Entity = async ({ entity, entityType }: Props) => {
	const EntityComponent = entityComponents[entityType];
	const MetadataComponent = metadataComponents[entityType];
	const entityMetadataList = EntitiesMetadataList[entityType];

	return (
		<EntityContainer entityId={entity.id}>
			<EntityComponent entity={entity} entityType={entityType}>
				<EntityMetadataList
					entityId={entity.id}
					entityType={entityType}
					names={entityMetadataList}
					render={(metadataArr: RawMetadata[]) => (
						<MetadataComponent entityId={entity.id} metadataArr={metadataArr} />
					)}
				/>
			</EntityComponent>
		</EntityContainer>
	);
};
