import type { Map as MapLibre, Marker } from "maplibre-gl";
import { useEffect, useRef } from "react";
import type { LatLng } from "@/types";
import { createMarker } from "./utils";

export const useRenderMarker = (
	maplibre: MapLibre | undefined,
	initialMapCenter: LatLng,
	mapCenter?: LatLng,
) => {
	const markerRef = useRef<Marker | null>(null);

	useEffect(() => {
		if (!maplibre || !initialMapCenter) {
			return;
		}

		const marker = createMarker(maplibre, initialMapCenter);
		markerRef.current = marker;
		return () => {
			marker.remove();
		};
	}, [maplibre, initialMapCenter]);

	useEffect(() => {
		if (markerRef.current && mapCenter) {
			markerRef.current.setLngLat(mapCenter);
		}
	}, [mapCenter]);
};
