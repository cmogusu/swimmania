import type { EntityType } from "@/server/types";
import type {
	IEntityMetadata,
	IMetadataPropertyType,
	RawMetadata,
} from "../types";
import { CoachMetadata } from "./CoachMetadata";
import { LifeguardMetadata } from "./LifeguardMetadata";
import { ParentMetadata } from "./ParentMetadata";
import { PoolMetadata } from "./PoolMetadata";
import { SchoolMetadata } from "./SchoolMetadata";
import { SwimEventMetadata } from "./SwimEventMetadata";
import { SwimMeetMetadata } from "./SwimMeetMetadata";
import { SwimmerMetadata } from "./SwimmerMetadata";
import { SwimResultMetadata } from "./SwimResultMetadata";
import { TeamMetadata } from "./TeamMetadata";

type EntityMetadataClassType = {
	new (
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties?: boolean,
	): IEntityMetadata;
	getPropertyInstance: (rawMetadata: RawMetadata) => IMetadataPropertyType;
};

const entityMetadataClasses: Record<EntityType, EntityMetadataClassType> = {
	coach: CoachMetadata,
	swimMeet: SwimMeetMetadata,
	pool: PoolMetadata,
	school: SchoolMetadata,
	swimmer: SwimmerMetadata,
	team: TeamMetadata,
	swimEvent: SwimEventMetadata,
	swimResult: SwimResultMetadata,
	lifeguard: LifeguardMetadata,
	parent: ParentMetadata,
};

export const entityMetadataFactory = {
	getInstance(
		entityType: EntityType,
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties?: boolean,
	) {
		const EntityMetadataClass = entityMetadataClasses[entityType];
		if (!EntityMetadataClass) {
			throw Error("Invalid entity type");
		}

		return new EntityMetadataClass(rawMetadataArr, intializeAllProperties);
	},

	getPropertyInstance(entityType: EntityType, rawMetadata: RawMetadata) {
		const EntityMetadataClass = entityMetadataClasses[entityType];
		if (!EntityMetadataClass) {
			throw Error("Invalid entity type");
		}

		return EntityMetadataClass.getPropertyInstance(rawMetadata);
	},
};
