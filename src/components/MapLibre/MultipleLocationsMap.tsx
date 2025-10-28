"use client";

import { center as turfCenter, points as turfPoints } from "@turf/turf";
import type { Map as MapLibre, Marker } from "maplibre-gl";
import dynamic from "next/dynamic";
import {
	type ComponentType,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import type { EntityLatLng, LatLng } from "@/types";
import { ResponsiveMapContainer } from "../MapContainer";
import type { MaplibreProps } from "./MaplibreMap";
import { createMarker } from "./utils";

const MaplibreMap: ComponentType<MaplibreProps> = dynamic(
	() => import("./MaplibreMap"),
);

type Props = {
	locations: EntityLatLng[];
};

export const MultipleLocationsMap = ({ locations }: Props) => {
	const initialMapCenter = useGetLocationsCenter(locations);
	const [maplibre, setMaplibre] = useState<MapLibre | undefined>();

	useFitLocations(maplibre, locations);
	useRenderMarkers(maplibre, locations);

	if (!locations?.length || !initialMapCenter) {
		return null;
	}

	return (
		<ResponsiveMapContainer>
			<MaplibreMap center={initialMapCenter} setMaplibre={setMaplibre} />
		</ResponsiveMapContainer>
	);
};

const useGetLocationsCenter = (locations: LatLng[]): LatLng | undefined =>
	useMemo(() => {
		if (!locations.length) {
			return;
		}

		const features = turfPoints(locations.map((l) => [l.lng, l.lat]));
		const [lng, lat] = turfCenter(features).geometry.coordinates;
		return { lng, lat };
	}, [locations]);

const useFitLocations = (
	maplibre: MapLibre | undefined,
	locations: EntityLatLng[],
) => {
	useEffect(() => {
		if (!maplibre || !locations.length) {
			return;
		}

		if (containsAllLocations(maplibre, locations)) {
			return;
		}

		fitLocations(maplibre, locations);
	}, [maplibre, locations]);
};

const useRenderMarkers = (
	maplibre: MapLibre | undefined,
	locations: EntityLatLng[],
) => {
	const markersRefs = useRef<Record<string, Marker>>({});

	useEffect(() => {
		if (!maplibre) {
			return;
		}

		const prevMarkers = { ...markersRefs.current };
		for (const location of locations) {
			const { entityId } = location;
			if (prevMarkers[entityId]) {
				delete prevMarkers[entityId];
				continue;
			}

			markersRefs.current[entityId] = createMarker(maplibre, location);
		}

		for (const entityId in prevMarkers) {
			prevMarkers[entityId].remove();
			delete markersRefs.current[entityId];
		}
	}, [maplibre, locations]);
};

const containsAllLocations = (maplibre: MapLibre, locations: LatLng[]) => {
	const bounds = maplibre.getBounds();
	return locations.every((l) => bounds.contains(l));
};

const fitLocations = (maplibre: MapLibre, locations: LatLng[]) => {
	const bounds = maplibre.getBounds();
	locations.forEach((l) => bounds.extend(l));
	maplibre.fitBounds(bounds, {
		padding: { top: 50, bottom: 50, left: 50, right: 50 },
		linear: true,
	});
};
