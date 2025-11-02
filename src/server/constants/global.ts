import type { EntityType } from "../types";

export const MAX_TEXT_LENGTH = 3000;
export const POSTS_PER_PAGE = 5;

// Entity types
export const EntityTypes: Record<EntityType, string> = {
	parent: "parent",
	swimmer: "swimmer",
	school: "school",
	pool: "pool",
	team: "team",
	coach: "coach",
	lifeguard: "lifeguard",
	swimMeet: "swimMeet",
	swimEvent: "swimEvent",
	swimResult: "swimResult",
	user: "user",
	comment: "comment",
	rating: "rating",
};

export const EntityTypePlurals: Record<EntityType, string> = {
	parent: "Parents",
	swimmer: "Swimmers",
	school: "Schools",
	pool: "Pools",
	team: "Teams",
	coach: "Coaches",
	lifeguard: "Lifeguards",
	swimMeet: "Swimming Meets",
	swimEvent: "Swimming Events",
	swimResult: "Swimming Results",
	user: "Users",
	comment: "Comments",
	rating: "Ratings",
};

export const EntityTypesKeys = Object.keys(EntityTypes);

export const EntityTypesValues = Object.values(EntityTypes);
