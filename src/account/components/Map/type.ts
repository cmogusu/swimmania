import type { LngLatLike } from "maplibre-gl";

export type OnMapClick = (mapCenter: LngLatLike) => void;

export type MapRef = { setCenterOnClick: (_: OnMapClick) => void };
