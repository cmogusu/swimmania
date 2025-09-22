import type { LatLng, LngLat } from "./types";

export const TOAST_RENDER_DELAY_MS = 5000;

export const API_KEY_PLACEHOLDER = "XXX-API-KEY-XXX";

const defaultLat = 38.886986812976716;
const defaultLng = -77.02802728158858;
export const DEFAULT_MAP_ZOOM = 12.3;
export const DEFAULT_MAP_CENTER: LngLat = [defaultLng, defaultLat];
export const DEFAULT_MAP_CENTER_LATLNG: LatLng = [defaultLat, defaultLng];

export const BaseImageUploadUrl: string = "/upload";

export const DefaultSiteImage: { src: string; alt: string } = {
	src: "/images/default-swimmania-image.jpg",
	alt: "Default Swimmania image",
};

// Ratio of height to width ratio
export const ImgHeightToWidthRatio = 666 / 1000;
