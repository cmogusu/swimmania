"use client";

import type { Map as MapLibre, MapMouseEvent } from "maplibre-gl";
import dynamic from "next/dynamic";
import { type ComponentType, useEffect, useState } from "react";
import { DEFAULT_MAP_CENTER } from "@/constants";
import type { EntityType } from "@/server/types";
import type { LatLng } from "@/types";
import { FixedMapContainer } from "../MapContainer";
import { EditLocationForm } from "./EditLocationForm";
import type { MaplibreProps } from "./MaplibreMap";
import { useRenderMarker } from "./useRenderMarker";

type Props = {
	metadataId: number;
	entityId: number;
	entityType: EntityType;
	location?: LatLng;
	zoom?: number;
};

const MaplibreMap: ComponentType<MaplibreProps> = dynamic(
	() => import("./MaplibreMap"),
);

export const EditSingleLocationMap = ({
	metadataId,
	entityId,
	entityType,
	location,
	zoom,
}: Props) => {
	const initialMapCenter =
		location?.lat && location?.lng ? location : DEFAULT_MAP_CENTER;

	const [mapCenter, setMapCenter] = useState<LatLng>(initialMapCenter);
	const [maplibre, setMaplibre] = useState<MapLibre | undefined>();

	useRenderMarker(maplibre, initialMapCenter, initialMapCenter);

	useEffect(() => {
		if (maplibre) {
			handleMapClicks(maplibre, setMapCenter);
		}
	}, [maplibre]);

	const isSubmitDisabled =
		mapCenter.lat === initialMapCenter?.lat &&
		mapCenter.lng === initialMapCenter?.lng;

	return (
		<div className="mb-4">
			<FixedMapContainer>
				<MaplibreMap center={location} zoom={zoom} setMaplibre={setMaplibre} />
			</FixedMapContainer>
			<EditLocationForm
				metadataId={metadataId}
				entityId={entityId}
				entityType={entityType}
				latValue={mapCenter.lat}
				lngValue={mapCenter.lng}
				isSubmitDisabled={isSubmitDisabled}
			/>
		</div>
	);
};

const handleMapClicks = (
	maplibre: MapLibre,
	onMapClick: (latLng: LatLng) => void,
) => {
	maplibre.on("click", (event: MapMouseEvent) => {
		const { lat, lng } = event.lngLat;
		onMapClick({ lat, lng });
	});
};
