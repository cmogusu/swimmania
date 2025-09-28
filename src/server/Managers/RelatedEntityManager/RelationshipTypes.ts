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

export const RelationshipDescriptionsDelete = {
	isAlso: {
		between: [
			"coach-lifeguard",
			"coach-swimmer",
			"coach-parent",
			"lifeguard-swimmer",
			"swimmer-parent",
		],
		title: "Is same as",
	},
	worksIn: {
		between: [
			"coach-school",
			"coach-pool",
			"lifeguard-school",
			"lifeguard-pool",
		],
	},
	trainsAt: {
		between: ["coach-pool", "swimmer-pool"],
	},
	canBeFound: {
		between: [
			"coach-school",
			"coach-pool",
			"lifeguard-school",
			"lifeguard-pool",
		],
	},
	manages: {
		between: ["coach-team", "coach-swimmer"],
	},
	includes: {
		between: ["swimEvent-swimMeet", "swimEvent-swimResult"],
	},
	participatedIn: {
		between: [["swimEvent", "swimmer"], "swimMeet-swimmer"],
	},
};
