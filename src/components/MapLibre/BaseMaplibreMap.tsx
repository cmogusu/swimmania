"use client";

import {
	FullscreenControl,
	type LngLatLike,
	Map as MapLibre,
	NavigationControl,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import type { MapRef } from "@/account/components/Map/type";
import { MapContainer } from "@/components/MapContainer";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/constants";
import { logInfo } from "@/utilities/log";

type Props = {
	styleUrl: string;
	center?: LngLatLike;
	zoom?: number;
	ref: React.ForwardedRef<MapRef>;
};

export function BaseMaplibreMap({ styleUrl, center, zoom, ref }: Props) {
	const initialMapCenter = center || DEFAULT_MAP_CENTER;
	const initialZoom = zoom || DEFAULT_MAP_ZOOM;

	const [mapCenter, setMapCenter] = useState<LngLatLike>(initialMapCenter);
	const divRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<MapLibre>(null);

	useImperativeHandle(ref, () => {
		return {
			setCenterOnClick: (onMapClick) => {
				if (!mapRef.current) {
					// throw Error("map instance not set");
					return;
				}

				mapRef.current.on("click", (event) => {
					const newCenter = event.lngLat.toArray();
					setMapCenter(newCenter);
					onMapClick(newCenter);
				});
			},
		};
	}, []);

	useEffect(() => {
		if (!styleUrl) {
			throw Error("style url not set");
		}

		if (!divRef.current || divRef.current.querySelector("canvas")) {
			return;
		}

		logInfo("Creating maplibre map instance");
		mapRef.current = renderMap(
			divRef.current,
			styleUrl,
			mapCenter,
			initialZoom,
		);
		return () => {
			if (mapRef.current) {
				logInfo("Removing maplibre map");
				mapRef.current.remove();
			}
		};
	}, [styleUrl, mapCenter, initialZoom]);

	return (
		<MapContainer>
			<div className="w-full h-full" ref={divRef} />
		</MapContainer>
	);
}

export function renderMap(
	container: HTMLDivElement,
	styleUrl: string,
	center: LngLatLike,
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

	map.on("click", (event) => {
		logInfo(event.lngLat);
	});

	map.on("zoom", () => {
		logInfo(map.getZoom());
	});

	return map;
}
