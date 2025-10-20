import type {
	EntityType,
	RelatedEntityRelationship,
	RelationshipType,
	RelationshipTypeDescription,
} from "./types";

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

export const RelationshipTypes: Record<
	RelationshipType,
	RelationshipTypeDescription
> = {
	isAlso: {
		title: "Is same as",
		description: "The entities are the same person. Eg a coach is a swimmer",
	},
	worksAt: {
		title: "Works in",
		description: "Works in said location. Eg a coach works in a school",
	},
	trainsAt: {
		title: "Works in",
		description: "Works in said location. Eg a coach works in a school",
	},
	canBeFoundAt: {
		title: "Can be found at",
		description: "Eg a lifeguard can be found in a pool",
	},
	manages: {
		title: "Manages",
		description: "Eg a coach manages a team",
	},
	contains: {
		title: "Contains",
		description:
			"Eg a swim meet contains many swimming events which can in turn contain swimming results",
	},
	participatedIn: {
		title: "Participated in",
		description: "A swimmer can participate in a swimming meet, or event",
	},
	parentOf: {
		title: "Parent of",
		description: "Entity is parent to a swimmer",
	},
};

export const EntityRelationships: Record<
	EntityType,
	RelatedEntityRelationship[]
> = {
	pool: [
		["worksAt", "coach"],
		["canBeFoundAt", "school"],
	],
	coach: [
		["worksAt", "school"],
		["worksAt", "pool"],
		["isAlso", "swimmer"],
		["isAlso", "lifeguard"],
	],
	swimmer: [
		["trainsAt", "school"],
		["trainsAt", "pool"],
	],
	school: [["contains", "pool"]],
	team: [["trainsAt", "pool"]],
	swimMeet: [["canBeFoundAt", "pool"]],
	lifeguard: [["worksAt", "pool"]],
	swimResult: [["worksAt", "school"]],
	swimEvent: [["canBeFoundAt", "swimResult"]],
	parent: [["parentOf", "swimmer"]],
};
