import type { LatLng } from "./types";

export const TOAST_RENDER_DELAY_MS = 5000;

export const DEFAULT_BASE_MAP_ZOOM = 4;
export const DEFAULT_BASE_MAP_ZOOM_WITH_LOCATION = 12.3;
export const DEFAULT_BASE_MAP_CENTER: LatLng = { lat: 38, lng: -98 };

export const DEFAULT_MAP_ZOOM = 12.3;
export const DEFAULT_MAP_CENTER: LatLng = {
	lng: -77.02802728158858,
	lat: 38.886986812976716,
};

export const BaseImageUploadUrl: string = "/upload";

export const DefaultSiteImage: { src: string; alt: string } = {
	src: "/images/default-swimmania-image.jpg",
	alt: "Default Swimmania image",
};

// Ratio of height to width ratio
export const ImgHeightToWidthRatio = 666 / 1000;
