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

// TODO - Fix for inverse relationships eg coach works at pool vs pool has these coaches working there
export const RelationshipDescriptions: Record<
	RelationshipType,
	RelationshipTypeDescription
> = {
	isAlso: {
		getTitle: (relatedEntityType: EntityType) =>
			`Is also a ${relatedEntityType}`,
		description: "The entities are the same person. Eg a coach is a swimmer",
	},
	worksAt: {
		getTitle: (relatedEntityType: EntityType) =>
			`Works at these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Works in said location. Eg a coach works in a school",
	},
	trainsAt: {
		getTitle: (relatedEntityType: EntityType) =>
			`Trains at these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Works in said location. Eg a coach works in a school",
	},
	canBeFoundAt: {
		getTitle: (relatedEntityType: EntityType) =>
			`Can be found at these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Eg a lifeguard can be found in a pool",
	},
	manages: {
		getTitle: (relatedEntityType: EntityType) =>
			`Manages these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Eg a coach manages a team",
	},
	contains: {
		getTitle: (relatedEntityType: EntityType) =>
			`Includes these ${EntityTypePlurals[relatedEntityType]}`,
		description:
			"Eg a swim meet contains many swimming events which can in turn contain swimming results",
	},
	participatedIn: {
		getTitle: (relatedEntityType: EntityType) =>
			`Participated in these ${EntityTypePlurals[relatedEntityType]}`,
		description: "A swimmer can participate in a swimming meet, or event",
	},
	parentOf: {
		getTitle: (relatedEntityType: EntityType) =>
			`Parent of these ${EntityTypePlurals[relatedEntityType]}`,
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
