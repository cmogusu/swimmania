"use client";

import {
	FullscreenControl,
	Map as MapLibre,
	NavigationControl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { MapContainer } from "@/components/MapContainer";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/constants";
import type { LngLat } from "@/types";
import { logInfo } from "@/utilities/log";

type Props = {
	styleUrl: string;
};

export function BaseMaplibreMap({ styleUrl }: Props) {
	const divRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<MapLibre>(null);

	useEffect(() => {
		if (
			!styleUrl ||
			!divRef.current ||
			divRef.current.querySelector("canvas")
		) {
			return;
		}

		logInfo("Creating maplibre map instance");
		mapRef.current = renderMap(divRef.current, styleUrl);
		return () => {
			if (mapRef.current) {
				logInfo("Removing maplibre map map");
				mapRef.current.remove();
			}
		};
	}, [styleUrl]);

	return (
		<MapContainer>
			<div className="w-full h-full" ref={divRef} />
		</MapContainer>
	);
}

export function renderMap(
	container: HTMLDivElement,
	styleUrl: string,
	zoom: number = DEFAULT_MAP_ZOOM,
	center: LngLat = DEFAULT_MAP_CENTER,
) {
	const map = new MapLibre({
		container,
		zoom,
		center,
		style: styleUrl,
		pitch: 0,
		maxZoom: 18,
		maxPitch: 85,
	});

	map.addControl(new FullscreenControl(), "top-left");
	map.addControl(
		new NavigationControl({
			showCompass: true,
			showZoom: true,
			visualizePitch: true,
			visualizeRoll: true,
		}),
		"top-left",
	);

	map.on("click", (event) => {
		logInfo(event.lngLat);
	});

	map.on("zoom", () => {
		logInfo(map.getZoom());
	});

	return map;
}
