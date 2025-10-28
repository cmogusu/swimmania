"use client";

import type { Map as MapLibre } from "maplibre-gl";
import type { LatLng } from "@/types";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/constants";
import { BaseMaplibreMap } from "./BaseMaplibreMap";

export type MaplibreProps = {
	center?: LatLng;
	zoom?: number;
	setMaplibre: (map: MapLibre) => void;
};

export default function MaplibreMap(props: MaplibreProps) {
	const { center = DEFAULT_MAP_CENTER, zoom = DEFAULT_MAP_ZOOM } = props;
	const [maplibre, setMaplibre] = useState<MapLibre | undefined>();

	useEffect(() => {
		if (maplibre) {
			props.setMaplibre(maplibre);
		}
	}, [maplibre, props.setMaplibre]);

	useEffect(() => {
		if (maplibre && center) {
			maplibre.setCenter(center);
		}
	}, [maplibre, center]);

	useEffect(() => {
		if (maplibre && zoom) {
			maplibre.setZoom(zoom);
		}
	}, [maplibre, zoom]);

	return <BaseMaplibreMap setMaplibre={setMaplibre} />;
}
