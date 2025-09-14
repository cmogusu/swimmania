"use client";

import type { LngLatLike } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { BaseMaplibreMap } from "@/components/MapLibre/";
import type { MapRef } from "./type";

type Props = {
	lat: number | undefined;
	lng: number | undefined;
	styleUrl: string;
};

export const EditMap = ({ styleUrl, lat, lng }: Props) => {
	const mapRef = useRef<MapRef>(null);
	const center = lat && lng ? { lng, lat } : undefined;

	useEffect(() => {
		mapRef.current?.setCenterOnClick((newCenter: LngLatLike) => {
			console.log("new center:", newCenter);
		});
	}, []);

	return (
		<BaseMaplibreMap
			ref={mapRef}
			styleUrl={styleUrl}
			center={center}
			zoom={16}
		/>
	);
};
