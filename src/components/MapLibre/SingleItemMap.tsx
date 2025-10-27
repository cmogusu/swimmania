"use client";

import type { LngLatLike, Map as MapLibre } from "maplibre-gl";
import dynamic from "next/dynamic";
import { type ComponentType, useEffect, useRef } from "react";
import type { MetadataData } from "@/server/types";
import { logInfo } from "@/utilities/log";
import type { BaseMaplibreProps } from "./BaseMaplibreMap";

const BaseMaplibreMap: ComponentType<BaseMaplibreProps> = dynamic(
	() => import("./BaseMaplibreMap"),
);

type Props = {
	metadataArr: MetadataData[];
};

export const SingleItemMap = async ({ metadataArr }: Props) => {
	const lngLat = extractLatLng(metadataArr);
	const mapTilerApiKey = process.env.MAPTILER_API_KEY;
	const styleUrl = `https://api.maptiler.com/maps/backdrop/style.json?key=${mapTilerApiKey}`;
	const mapRef = useRef<MapLibre | null>(null);

	useEffect(() => {
		const { current: map } = mapRef;

		if (!map) {
			return;
		}

		map.on("click", (event) => {
			logInfo(event.lngLat);
		});
	}, []);

	return (
		<div>
			<BaseMaplibreMap styleUrl={styleUrl} center={lngLat} mapRef={mapRef} />
			<form action=""></form>
		</div>
	);
};

const extractLatLng = (metadata: MetadataData[]) => {
	const lngLat: LngLatLike = { lat: 30, lng: 30 };

	metadata.forEach((m) => m);
	return lngLat;
};
