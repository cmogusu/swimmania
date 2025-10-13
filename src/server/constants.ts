import type { EntityType } from "./types";

export const MAX_TEXT_LENGTH = 3000;
export const POSTS_PER_PAGE = 5;

// Entity types
export const EntityTypes = {
	swimmer: "swimmer",
	school: "school",
	pool: "pool",
	team: "team",
	swimMeet: "swimMeet",
	coach: "coach",
	lifeguard: "lifeguard",
	swimResult: "swimResult",
	swimEvent: "swimEvent",
};

export const EntityTypePlurals: Record<EntityType, string> = {
	parent: "Parents",
	swimmer: "Swimmers",
	school: "Schools",
	pool: "Pools",
	team: "Teams",
	coach: "Coaches",
	swimMeet: "Swimming Meets",
	lifeguard: "Lifeguards",
	swimResult: "Swimming Results",
	swimEvent: "Swimming Events",
};

export const EntityTypesKeys = Object.keys(EntityTypes);

export const EntityTypesValues = Object.values(EntityTypes);
