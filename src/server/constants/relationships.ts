import type {
	EntityType,
	RelatedEntityRelationship,
	RelationshipType,
	RelationshipTypeDescription,
} from "../types";
import { EntityTypePlurals } from "./entity";

export const EntityRelationships: Record<
	EntityType,
	RelatedEntityRelationship[]
> = {
	pool: [
		["worksAt_inverse", "coach"],
		["worksAt_inverse", "lifeguard"],
		["trainsAt_inverse", "swimmer"],
		["trainsAt_inverse", "team"],
		["canBeFoundAt_inverse", "swimMeet"],
		["canBeFoundAt", "school"],
		["rating", "rating"],
		["owns_inverse", "user"],
	],
	coach: [
		["worksAt", "school"],
		["worksAt", "pool"],
		["isAlso", "swimmer"],
		["isAlso", "lifeguard"],
		["rating", "rating"],
		["rating", "rating"],
		["owns_inverse", "user"],
	],
	swimmer: [
		["trainsAt", "school"],
		["trainsAt", "pool"],
		["parentOf_inverse", "parent"],
		["comment", "comment"],
		["owns_inverse", "user"],
	],
	school: [
		["contains", "pool"],
		["trainsAt_inverse", "swimmer"],
		["rating", "rating"],
		["owns_inverse", "user"],
	],
	team: [
		["trainsAt", "pool"],
		["rating", "rating"],
		["owns_inverse", "user"],
	],
	lifeguard: [
		["worksAt", "pool"],
		["rating", "rating"],
		["owns_inverse", "user"],
	],
	swimMeet: [
		["canBeFoundAt", "pool"],
		["contains", "swimEvent"],
		["rating", "rating"],
		["owns_inverse", "user"],
	],
	swimEvent: [
		["contains", "swimResult"],
		["contains_inverse", "swimMeet"],
		["comment", "comment"],
		["owns_inverse", "user"],
	],
	swimResult: [
		["contains_inverse", "swimEvent"],
		["owns_inverse", "user"],
	],
	parent: [
		["parentOf", "swimmer"],
		["owns_inverse", "user"],
	],
	comment: [
		["contains_inverse", "school"],
		["owns_inverse", "user"],
	],
	rating: [
		["contains_inverse", "school"],
		["owns_inverse", "user"],
	],
	user: [
		["owns", "pool"],
		["owns", "coach"],
		["owns", "swimmer"],
		["owns", "school"],
		["owns", "team"],
		["owns", "lifeguard"],
		["owns", "swimMeet"],
		["owns", "swimEvent"],
		["owns", "swimResult"],
		["owns", "parent"],
		["owns", "comment"],
		["owns", "rating"],
	],
};

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
	worksAt_inverse: {
		getTitle: (relatedEntityType: EntityType) =>
			`These ${EntityTypePlurals[relatedEntityType]} work here`,
		description: "",
	},
	trainsAt: {
		getTitle: (relatedEntityType: EntityType) =>
			`Trains at these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Works in said location. Eg a coach works in a school",
	},
	trainsAt_inverse: {
		getTitle: (relatedEntityType: EntityType) =>
			`These ${EntityTypePlurals[relatedEntityType]} train here`,
		description: "",
	},
	canBeFoundAt: {
		getTitle: (relatedEntityType: EntityType) =>
			`Can be found at these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Eg a lifeguard can be found in a pool",
	},
	canBeFoundAt_inverse: {
		getTitle: (relatedEntityType: EntityType) =>
			`These ${EntityTypePlurals[relatedEntityType]} can be found here`,
		description: "",
	},
	manages: {
		getTitle: (relatedEntityType: EntityType) =>
			`Manages these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Eg a coach manages a team",
	},
	manages_inverse: {
		getTitle: (relatedEntityType: EntityType) =>
			`Is managed by these ${EntityTypePlurals[relatedEntityType]}`,
		description: "",
	},
	contains: {
		getTitle: (relatedEntityType: EntityType) =>
			`Includes these ${EntityTypePlurals[relatedEntityType]}`,
		description:
			"Eg a swim meet contains many swimming events which can in turn contain swimming results",
	},
	contains_inverse: {
		getTitle: (relatedEntityType: EntityType) =>
			`Belongs to these ${EntityTypePlurals[relatedEntityType]}`,
		description: "",
	},
	participatedIn: {
		getTitle: (relatedEntityType: EntityType) =>
			`Participated in these ${EntityTypePlurals[relatedEntityType]}`,
		description: "A swimmer can participate in a swimming meet, or event",
	},
	participatedIn_inverse: {
		getTitle: (relatedEntityType: EntityType) =>
			`Participating ${EntityTypePlurals[relatedEntityType]}`,
		description: "",
	},
	parentOf: {
		getTitle: (relatedEntityType: EntityType) =>
			`Parent of these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Entity is parent to a swimmer",
	},
	parentOf_inverse: {
		getTitle: (relatedEntityType: EntityType) =>
			`Is child of these ${EntityTypePlurals[relatedEntityType]}`,
		description: "",
	},
	comment: {
		getTitle: () => "Comments",
		description: "Entity is parent to a swimmer",
	},
	comment_inverse: {
		getTitle: (relatedEntityType: EntityType) =>
			`Comments of these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Entity is parent to a swimmer",
	},
	rating: {
		getTitle: () => `Ratings`,
		description: "Ratings of entity",
	},
	rating_inverse: {
		getTitle: (relatedEntityType: EntityType) =>
			`Ratings of these ${EntityTypePlurals[relatedEntityType]}`,
		description: "Rating belonging to entity type",
	},
	owns: {
		getTitle: () => `Owns`,
		description: "",
	},
	owns_inverse: {
		getTitle: () => `Owned_by`,
		description: "",
	},
};

export const RELATIONSHIP_DB_TABLES: Record<string, string> = {
	user: "relationships_user",
	swimEvent: "relationships_swimResult",
	swimResult: "relationships_swimEvent",
};
