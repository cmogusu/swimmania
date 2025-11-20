import {
	FullscreenControl,
	Map as MapLibre,
	NavigationControl,
} from "maplibre-gl";
import type { LatLng } from "@/types";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useState } from "react";
import { DEFAULT_MAP_CENTER } from "@/constants";
import { logInfo } from "@/utilities/log";

const MAP_ZOOM = 1;

export const useInitMap = (
	apiKey: string | undefined,
	container: HTMLDivElement | null,
) => {
	const [maplibre, setMaplibre] = useState<MapLibre>();

	useEffect(() => {
		if (!apiKey) {
			return;
		}

		if (!container) {
			return;
		}

		logInfo("Creating maplibre map instance");
		const styleUrl = `https://api.maptiler.com/maps/backdrop/style.json?key=${apiKey}`;
		const { unsubscribe, ref } = renderMap(
			container,
			styleUrl,
			DEFAULT_MAP_CENTER,
			MAP_ZOOM,
		);

		setMaplibre(ref);

		return () => {
			logInfo("Removing maplibre map");
			unsubscribe();
		};
	}, [apiKey, container]);

	return maplibre;
};

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
