import type {
	EntityType,
	RelatedEntityRelationship,
	RelationshipType,
	RelationshipTypeDescription,
} from "../types";
import { EntityTypePlurals } from "./global";

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
		["parentOf_inverse", "parent"],
	],
	school: [
		["contains", "pool"],
		["trainsAt_inverse", "swimmer"],
	],
	team: [["trainsAt", "pool"]],
	lifeguard: [["worksAt", "pool"]],
	swimMeet: [
		["canBeFoundAt", "pool"],
		["contains", "swimEvent"],
	],
	swimEvent: [
		["contains", "swimResult"],
		["contains_inverse", "swimMeet"],
	],
	swimResult: [["contains_inverse", "swimEvent"]],
	parent: [["parentOf", "swimmer"]],
	user: [],
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
};
