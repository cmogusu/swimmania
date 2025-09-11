"use client";

import { useContext, useRef, useEffect } from "react";
import {
	MapContext,
	type MapLibreGlWrapper,
} from "@mapcomponents/react-maplibre";
import maplibregl, { type LngLatLike } from "maplibre-gl";
import { getCustomLayer } from "./testLayer";

/**
 * Renders obj or gltf 3D Models on the MapLibreMap referenced by props.mapId
 */

export interface MlThreeJsLayerProps {
	mapId?: string;
	init?: () => void;
	onDone?: () => void;
}

export const ThreeJsLayer = (props: MlThreeJsLayerProps) => {
	const mapContext = useContext(MapContext);

	const layerName = "3d-model";
	const initializedRef = useRef(false);
	const mapRef = useRef<MapLibreGlWrapper | null>(null);
	const initFuncRef = useRef(props.init);

	const cleanup = () => {
		if (mapRef.current?.style) {
			if (mapRef.current.getLayer(layerName)) {
				mapRef.current.removeLayer(layerName);
			}
			mapRef.current = null;
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: false positive
	useEffect(() => {
		if (typeof initFuncRef.current === "function") {
			initFuncRef.current();
		}

		return cleanup;
	}, []);

	useEffect(() => {
		if (!mapContext.mapExists(props.mapId) || initializedRef.current) return;

		initializedRef.current = true;
		mapRef.current = mapContext.getMap(props.mapId);

		mapRef.current?.setCenter([7.099771581806502, 50.73395746209983]);
		mapRef.current?.setZoom(15);
		mapRef.current?.setPitch(45);

		// parameters to ensure the model is georeferenced correctly on the map
		const modelOrigin = [7.099771581806502, 50.73395746209983];
		// 50.73395746209983, 7.099771581806502
		const modelAltitude = 0;
		const modelRotate = [Math.PI / 2, 45, 0];

		const modelAsMercatorCoordinate = maplibregl.MercatorCoordinate.fromLngLat(
			modelOrigin as LngLatLike,
			modelAltitude,
		);

		// transformation parameters to position, rotate and scale the 3D model onto the map
		const modelTransform = {
			translateX: modelAsMercatorCoordinate.x + 0.0000008,
			translateY: modelAsMercatorCoordinate.y + 0.0000018,
			translateZ: modelAsMercatorCoordinate.z,
			rotateX: modelRotate[0],
			rotateY: modelRotate[1],
			rotateZ: modelRotate[2],
			/* Since our 3D model is in real world meters, a scale transform needs to be
			 * applied since the CustomLayerInterface expects units in MercatorCoordinates.
			 */
			scale:
				modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() + 0.00000003,
		};

		const customLayer = getCustomLayer(modelTransform);
		// @ts-ignore
		mapRef.current?.addLayer(customLayer);

		if (mapRef.current?.getLayer(layerName)) {
			mapRef.current.setLayoutProperty(layerName, "visibility", "visible");
		}
	}, [mapContext, props]);

	return <></>;
};
