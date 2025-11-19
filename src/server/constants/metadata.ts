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
		"meetDates.startDate",
		"meetDates.endDate",
		"course",
		"location.lat",
		"location.lng",
		"location.name",
	],
	swimEvent: ["eventNumber", "swimStroke", "swimDistance"],
	swimResult: ["rank", "time"],
	parent: ["parentOf", "swimmer"],
	user: ["email"],
	comment: ["time"],
	rating: ["time"],
};

export const EntityMetadataDbTables: Record<EntityType, string> = {
	parent: "metadata_parent",
	swimmer: "metadata_swmmer",
	school: "metadata_school",
	pool: "metadata_pool",
	team: "metadata_team",
	coach: "metadata_coach",
	swimMeet: "metadata_swm_meet",
	lifeguard: "metadata_lifeguard",
	swimResult: "metadata_swm_result",
	swimEvent: "metadata_swm_event",
	user: "metadata_user",
	comment: "metadata_comment",
	rating: "metadata_rating",
};

export const MetadataDbDefaultColumnNames = ["id", "entityId"];
