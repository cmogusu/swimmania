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
import type { BaseMaplibreProps } from "./BaseMaplibreMap";
import { createMarker } from "./utils";

const BaseMaplibreMap: ComponentType<BaseMaplibreProps> = dynamic(
	() => import("./BaseMaplibreMap"),
);

type Props = {
	locations: EntityLatLng[];
};

export const MultipleLocationsMap = ({ locations }: Props) => {
	const initialMapCenter = useGetLocationsCenter(locations);
	const [maplibre, setMaplibre] = useState<MapLibre | undefined>();

	useFitLocations(maplibre, locations);
	useRenderMarkers(maplibre, locations);

	return (
		<div className="mb-4">
			<ResponsiveMapContainer>
				<BaseMaplibreMap center={initialMapCenter} setMaplibre={setMaplibre} />
			</ResponsiveMapContainer>
		</div>
	);
};

const useFitLocations = (
	maplibre: MapLibre | undefined,
	locations: EntityLatLng[],
) => {
	useEffect(() => {
		if (!maplibre || !locations.length) {
			return;
		}

		const bounds = maplibre.getBounds();
		locations.forEach((l) => bounds.extend(l));
		maplibre.fitBounds(bounds);
	}, [maplibre, locations]);
};

const useRenderMarkers = (
	maplibre: MapLibre | undefined,
	locations: EntityLatLng[],
) => {
	const markersRefs = useRef<Record<string, Marker>>({});

	useEffect(() => {
		if (!maplibre || !locations.length) {
			return;
		}

		locations.forEach((location) => {
			const { entityId } = location;
			if (!markersRefs.current[entityId]) {
				markersRefs.current[entityId] = createMarker(maplibre, location);
			}
		});

		return () => {
			for (const markerId in markersRefs.current) {
				markersRefs.current[markerId].remove();
			}
		};
	}, [maplibre, locations]);
};

const useGetLocationsCenter = (locations: LatLng[]): LatLng =>
	useMemo(() => {
		const features = turfPoints(locations.map((l) => [l.lng, l.lat]));
		const [lng, lat] = turfCenter(features).geometry.coordinates;
		return { lng, lat };
	}, [locations]);
