import type { EntityType } from "@/server/types";
import type { IEntityMetadata, RawMetadata } from "../types";
import { CoachMetadata } from "./CoachMetadata";
import { EventMetadata } from "./EventMetadata";
import { PoolMetadata } from "./PoolMetadata";
import { SchoolMetadata } from "./SchoolMetadata";
import { SwimmerMetadata } from "./SwimmerMetadata";
import { TeamMetadata } from "./TeamMetadata";

type EntityMetadataClassType = {
	new (
		rawMetadataArr?: RawMetadata[],
		intializeAllProperties?: boolean,
	): IEntityMetadata;
};

const entityMetadataClasses: Record<EntityType, EntityMetadataClassType> = {
	coach: CoachMetadata,
	event: EventMetadata,
	pool: PoolMetadata,
	school: SchoolMetadata,
	swimmer: SwimmerMetadata,
	team: TeamMetadata,
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
