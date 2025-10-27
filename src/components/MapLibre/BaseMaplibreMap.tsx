"use client";

import {
	FullscreenControl,
	Map as MapLibre,
	NavigationControl,
} from "maplibre-gl";
import type { LatLng } from "@/types";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/constants";
import { logInfo } from "@/utilities/log";

export type BaseMaplibreProps = {
	styleUrl: string;
	center?: LatLng;
	zoom?: number;
	setMaplibre: (map: MapLibre) => void;
};

export default function BaseMaplibreMap({
	center,
	zoom,
	styleUrl,
	setMaplibre,
}: BaseMaplibreProps) {
	const divRef = useRef<HTMLDivElement>(null);
	const mapZoom = zoom || DEFAULT_MAP_ZOOM;
	const mapCenter = center?.lat && center?.lng ? center : DEFAULT_MAP_CENTER;

	useEffect(() => {
		if (!styleUrl) {
			throw Error("style url not set");
		}

		if (!divRef.current) {
			return;
		}

		logInfo("Creating maplibre map instance");
		const { unsubscribe, ref } = renderMap(
			divRef.current,
			styleUrl,
			mapCenter,
			mapZoom,
		);

		setMaplibre(ref);

		return () => {
			logInfo("Removing maplibre map");
			unsubscribe();
		};
	}, [styleUrl, mapCenter, mapZoom, setMaplibre]);

	return <div className="w-full h-full" ref={divRef} />;
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
