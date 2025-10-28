"use client";

import type { Map as MapLibre } from "maplibre-gl";
import dynamic from "next/dynamic";
import { type ComponentType, useState } from "react";
import type { LatLng } from "@/types";
import { FixedMapContainer } from "../MapContainer";
import type { BaseMaplibreProps } from "./BaseMaplibreMap";
import { useRenderMarker } from "./useRenderMarker";

type Props = {
	center: LatLng;
	zoom?: number;
};

const BaseMaplibreMap: ComponentType<BaseMaplibreProps> = dynamic(
	() => import("./BaseMaplibreMap"),
);

export const SingleLocationMap = ({ center, zoom }: Props) => {
	const [maplibre, setMaplibre] = useState<MapLibre | undefined>();

	useRenderMarker(maplibre, center);

	if (!center) {
		return null;
	}

	return (
		<div className="mb-4">
			<FixedMapContainer>
				<BaseMaplibreMap
					center={center}
					zoom={zoom}
					setMaplibre={setMaplibre}
				/>
			</FixedMapContainer>
		</div>
	);
};
