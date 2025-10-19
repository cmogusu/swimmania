import type { RelationshipDescription, RelationshipType } from "./types";

export const RelationshipTypes: Record<
	RelationshipType,
	RelationshipDescription
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
};

export const RelationshipTypeKeys = Object.keys(RelationshipTypes);
