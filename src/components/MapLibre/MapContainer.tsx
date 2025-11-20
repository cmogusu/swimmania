"use client";

import type { Map as MapLibre } from "maplibre-gl";
import type { LatLng } from "@/types";
import "maplibre-gl/dist/maplibre-gl.css";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";
import { useApiKeyContext } from "@/context";
import { useMapDimesionsContext } from "@/context/mapDimensionsContext";
import { MapContent } from "./MapContent";
import { useInitMap } from "./useInitMap";

export type Props = PropsWithChildren & {
	center?: LatLng;
	zoom?: number;
	setMaplibre: (map: MapLibre) => void;
};

export function MapContainer({ zoom, center, ...props }: Props) {
	const [maplibre, setMaplibre] = useState<MapLibre>();

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

	return <BaseMap setMaplibre={setMaplibre} />;
}

/**
 * Using a separate class to avoid recreating Maplibre instance on prop update while maintaining
 * good hygeine (clean up on unmount)
 */
type BaseMapProps = {
	setMaplibre: (map: MapLibre) => void;
};

const BaseMap = ({ setMaplibre }: BaseMapProps) => {
	const { maptiler: maptilerApiKey } = useApiKeyContext();
	const { width, height } = useMapDimesionsContext();
	const divRef = useRef<HTMLDivElement>(null);
	const maplibre = useInitMap(maptilerApiKey, divRef.current);

	useEffect(() => {
		if (maplibre) {
			setMaplibre(maplibre);
		}
	}, [maplibre, setMaplibre]);

	return <MapContent divRef={divRef} width={width} height={height} />;
};
