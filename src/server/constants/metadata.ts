import type { EntityType } from "../types";

export const EntitiesMetadataList: Record<EntityType, string[]> = {
	pool: [
		"poolDimensions.length",
		"isHeated",
		"cleanliness",
		"location.lat",
		"location.lng",
	],
	coach: [
		"performance",
		"experience",
		"ratePerHour.ksh",
		"location.lat",
		"location.lng",
	],
	swimmer: ["dob"],
	school: ["averageSchoolFees.ksh", "location.lat", "location.lng"],
	team: ["membershipFee.ksh"],
	lifeguard: ["dob", "location.lat", "location.lng"],
	swimMeet: [
		"startEndDates.startDate",
		"course",
		"location.lat",
		"location.lng",
	],
	swimEvent: ["eventNumber", "swimStroke", "swimDistance"],
	swimResult: ["rank", "time"],
	parent: ["parentOf", "swimmer"],
	user: ["email"],
	comment: ["time"],
	rating: ["time"],
};

export const EntityMetadataDbTables: Record<EntityType, string> = {
	parent: "parent_metadata",
	swimmer: "swmmer_metadata",
	school: "school_metadata",
	pool: "pool_metadata",
	team: "team_metadata",
	coach: "coach_metadata",
	swimMeet: "swm_meet_metadata",
	lifeguard: "lifeguard_metadata",
	swimResult: "swm_result_metadata",
	swimEvent: "swm_event_metadata",
	user: "user_metadata",
	comment: "comment_metadata",
	rating: "rating_metadata",
};

export const MetadataDbDefaultColumnNames = ["id", "entityId"];
