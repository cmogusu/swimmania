import type { EntityType } from "./server";
import type { LatLng, LngLat } from "./types";

export const TOAST_RENDER_DELAY_MS = 5000;

export const API_KEY_PLACEHOLDER = "XXX-API-KEY-XXX";

const defaultLat = 38.886986812976716;
const defaultLng = -77.02802728158858;
export const DEFAULT_MAP_ZOOM = 12.3;
export const DEFAULT_MAP_CENTER: LngLat = [defaultLng, defaultLat];
export const DEFAULT_MAP_CENTER_LATLNG: LatLng = [defaultLat, defaultLng];

export const BaseUrl: string = "http://localhost:4000";

export const BaseImageUploadUrl: string = `${BaseUrl}/upload`;

export const DefaultImage: { src: string; alt: string } = {
	src: "/images/default-swimmania-image.jpg",
	alt: "Default Swimmania image",
};

export const DefaultSiteImage: { src: string; alt: string } = {
	src: "/images/default-swimmania-image.jpg",
	alt: "Default Swimmania image",
};

export const GoogleMapsApiKey: string =
	"AIzaSyAUVbzdXNK41kd-wvMLLeLAZhkMfNArUfc";

type MetadataType = {
	text: string;
	number: string;
	ratings: string;
	time: string;
	boolean: string;
};

export const MetadataTypes: MetadataType = {
	text: "text",
	number: "number",
	ratings: "ratings",
	time: "time",
	boolean: "boolean",
};

export const EntityTypes = {
	swimmer: "swimmer",
	school: "school",
	pool: "pool",
	team: "team",
	coach: "coach",
};

export const EntityTypePlurals: Record<EntityType, string> = {
	swimmer: "Swimmers",
	school: "Schools",
	pool: "Pools",
	team: "Teams",
	coach: "Coaches",
	event: "Events",
};

export const EntityTypesValues = Object.values(EntityTypes);

export const TopLevelEntityTypes = [
	EntityTypes.pool,
	EntityTypes.school,
	EntityTypes.swimmer,
	EntityTypes.team,
	EntityTypes.coach,
];

// Ratio of height to width ratio
export const ImgHeightToWidthRatio = 666 / 1000;
