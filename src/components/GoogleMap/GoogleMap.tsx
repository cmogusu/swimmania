"use client";

import {
	AdvancedMarker,
	Map as BaseMap,
	type MapMouseEvent,
	useMap,
} from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useId, useRef } from "react";
import {
	DEFAULT_BASE_MAP_CENTER,
	DEFAULT_BASE_MAP_ZOOM_WITH_LOCATION,
} from "@/constants";
import { useMapDimesionsContext } from "@/context";
import type { LatLng } from "@/types";
import { logError } from "@/utilities/log";

type Props = {
	center?: LatLng;
	viewport?: google.maps.LatLngBounds;
	onSetLocation: (location: LatLng) => void;
};

export const GoogleMap = ({ center, viewport, onSetLocation }: Props) => {
	const markerRef = useRef<google.maps.marker.AdvancedMarkerElement>(null);
	const { width, height } = useMapDimesionsContext();
	const mapId = useId();
	const map = useMap();

	useEffect(() => {
		if (viewport && map) {
			map.fitBounds(viewport);
		}
	}, [viewport, map]);

	const handleMapClick = useCallback(
		(event: MapMouseEvent) => {
			const { latLng } = event.detail;
			if (!latLng) {
				return;
			}

			onSetLocation(latLng as LatLng);
			map?.panTo(latLng);
			if (markerRef.current) {
				markerRef.current.position = latLng;
			}
		},
		[map, onSetLocation],
	);

	if (!width) {
		logError(
			"Map width and height not specified. Make sure to wrap map in MapContainer",
		);
		return null;
	}

	return (
		<div
			className="bg-gray-100"
			style={{ width: `${width}px`, height: `${height}px` }}
		>
			<BaseMap
				id={mapId}
				mapId={mapId}
				className="w-full h-full"
				center={center ?? DEFAULT_BASE_MAP_CENTER}
				zoom={DEFAULT_BASE_MAP_ZOOM_WITH_LOCATION}
				gestureHandling="cooperative"
				disableDefaultUI={true}
				onClick={handleMapClick}
			>
				{center && <AdvancedMarker ref={markerRef} position={center} />}
			</BaseMap>
		</div>
	);
};
