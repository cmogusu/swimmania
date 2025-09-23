import path from "node:path";
import type { EntityType } from "./types";

export const PublicFolder = path.join(__dirname, "../../public");
export const ImageFolder = path.join(PublicFolder, "img");

export const POSTS_PER_PAGE = 5;

export const PUBLIC_FOLDER = path.join(__dirname, "../public");
export const IMAGE_FOLDER = path.join(PUBLIC_FOLDER, "images");
export const IMAGE_FOLDER_URL = `/images`;

// Entity types
export const EntityTypes = {
	swimmer: "swimmer",
	school: "school",
	pool: "pool",
	team: "team",
	event: "event",
	coach: "coach",
	lifeguard: "lifeguard",
	swimResult: "swimResult",
	swimEvent: "swimEvent",
};

export const EntityTypePlurals: Record<EntityType, string> = {
	swimmer: "Swimmers",
	school: "Schools",
	pool: "Pools",
	team: "Teams",
	coach: "Coaches",
	event: "Events",
	lifeguard: "Lifeguards",
	swimResult: "Swimming Results",
	swimEvent: "Swimming Events",
};

export const EntityTypesKeys = Object.keys(EntityTypes);

export const EntityTypesValues = Object.values(EntityTypes);
