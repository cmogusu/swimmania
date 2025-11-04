import type {
	EntityType,
	MenuEntityType,
	PrivateEntityType,
	PublicEntityType,
} from "../types";

export const MAX_TEXT_LENGTH = 3000;
export const POSTS_PER_PAGE = 5;

export const EntityTypes: EntityType[] = [
	"parent",
	"swimmer",
	"school",
	"pool",
	"team",
	"coach",
	"lifeguard",
	"swimMeet",
	"swimEvent",
	"swimResult",
	"user",
	"comment",
	"rating",
];

export const ManuEntityTypes: MenuEntityType[] = [
	"pool",
	"coach",
	"team",
	"school",
	"lifeguard",
	"swimMeet",
];

export const PrivateEntityTypes: PrivateEntityType[] = [
	"parent",
	"user",
	"rating",
	"comment",
];

export const PrivateEntityTypesObj: Record<PrivateEntityType, boolean> = {
	parent: true,
	user: true,
	rating: true,
	comment: true,
};

export const PublicEntityTypes: PublicEntityType[] = [
	"swimmer",
	"school",
	"pool",
	"team",
	"coach",
	"lifeguard",
	"swimMeet",
	"swimEvent",
	"swimResult",
];

export const PublicEntityTypesObj: Record<PublicEntityType, boolean> = {
	swimmer: true,
	school: true,
	pool: true,
	team: true,
	coach: true,
	lifeguard: true,
	swimMeet: true,
	swimEvent: true,
	swimResult: true,
};

export const EntityTypeObj: Record<EntityType, string> = {
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

export const SingleEntityType: Record<EntityType, string> = {
	parent: "Parent",
	swimmer: "Swimmer",
	school: "School",
	pool: "Pool",
	team: "Team",
	coach: "Coach",
	lifeguard: "Lifeguard",
	swimMeet: "Swimming Meet",
	swimEvent: "Swimming Event",
	swimResult: "Swimming Result",
	user: "User",
	comment: "Comment",
	rating: "Rating",
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

export const EditEntityNameText: Record<EntityType, string> = {
	parent: "What is your name?",
	swimmer: "What is your name?",
	school: "What is your name?",
	pool: "What is your name?",
	team: "What is your name?",
	coach: "What is your name?",
	swimMeet: "What is your name?",
	lifeguard: "What is your name?",
	swimResult: "What is your name?",
	swimEvent: "What is your name?",
	user: "What is your name?",
	rating: "What do you think",
	comment: "What do you think",
};

export const EditEntityDescriptionText: Record<EntityType, string> = {
	parent: "Tell us about yourself.",
	swimmer: "Tell us about yourself.",
	school: "Tell us about yourself.",
	pool: "Tell us about yourself.",
	team: "Tell us about yourself.",
	coach: "Tell us about yourself.",
	swimMeet: "Tell us about yourself.",
	lifeguard: "Tell us about yourself.",
	swimResult: "Tell us about yourself.",
	swimEvent: "Tell us about yourself.",
	user: "Tell us about yourself.",
	rating: "Your views",
	comment: "Any comments?",
};
