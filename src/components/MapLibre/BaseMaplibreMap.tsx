"use client";

import {
	FullscreenControl,
	Map as MapLibre,
	NavigationControl,
} from "maplibre-gl";
import type { LatLng } from "@/types";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { useApiKeyContext } from "@/context";
import { useMapDimesionsContext } from "@/context/mapDimensionsContext";
import { logError, logInfo } from "@/utilities/log";

export type Props = {
	setMaplibre: (map: MapLibre) => void;
};

const MAP_ZOOM = 1;
const MAP_CENTER = {
	lat: 0.1,
	lng: 0.1,
};

export function BaseMaplibreMap({ setMaplibre }: Props) {
	const { maptiler: maptilerApiKey } = useApiKeyContext();
	const { width, height } = useMapDimesionsContext();
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!maptilerApiKey) {
			return;
		}

		if (!divRef.current) {
			return;
		}

		logInfo("Creating maplibre map instance");
		const styleUrl = `https://api.maptiler.com/maps/backdrop/style.json?key=${maptilerApiKey}`;
		const { unsubscribe, ref } = renderMap(
			divRef.current,
			styleUrl,
			MAP_CENTER,
			MAP_ZOOM,
		);

		setMaplibre(ref);

		return () => {
			logInfo("Removing maplibre map");
			unsubscribe();
		};
	}, [maptilerApiKey, setMaplibre]);

	if (!width) {
		logError(
			"Map width and height not specified. Make sure to wrap map in MapContainer",
		);
		return null;
	}

	return (
		<div
			className="bg-gray-100"
			style={{ width: `{width}px`, height: `${height}px` }}
			ref={divRef}
		/>
	);
}

export function renderMap(
	container: HTMLDivElement,
	styleUrl: string,
	center: LatLng,
	zoom: number,
) {
	const map = new MapLibre({
		container,
		zoom,
		center,
		style: styleUrl,
		pitch: 0,
		maxZoom: 22,
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

	const unsubscribe = () => {
		map.remove();
		container.innerHTML = "";
	};

	return {
		ref: map,
		unsubscribe,
	};
}
