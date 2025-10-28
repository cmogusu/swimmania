"use client";

import type { Map as MapLibre, MapMouseEvent } from "maplibre-gl";
import dynamic from "next/dynamic";
import { type ComponentType, useEffect, useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { DEFAULT_MAP_CENTER } from "@/constants";
import { updateLocationMetadata } from "@/server/api/apiActions";
import type { EntityType } from "@/server/types";
import type { LatLng } from "@/types";
import { MapContainer } from "../MapContainer";
import type { BaseMaplibreProps } from "./BaseMaplibreMap";
import { useRenderMarker } from "./useRenderMarker";

type Props = {
	id: number;
	latName: string;
	lngName: string;
	entityId: number;
	entityType: EntityType;
	center?: LatLng;
	zoom?: number;
};

const BaseMaplibreMap: ComponentType<BaseMaplibreProps> = dynamic(
	() => import("./BaseMaplibreMap"),
);

export const EditSingleLocationMap = ({
	id,
	latName,
	lngName,
	entityId,
	entityType,
	center,
	zoom,
}: Props) => {
	const initialMapCenter =
		center?.lat && center?.lng ? center : DEFAULT_MAP_CENTER;

	const [mapCenter, setMapCenter] = useState<LatLng>(initialMapCenter);
	const [maplibre, setMaplibre] = useState<MapLibre | undefined>();
	const buttonText = id === -1 ? "Insert" : "Update";

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
			<MapContainer>
				<BaseMaplibreMap
					center={center}
					zoom={zoom}
					setMaplibre={setMaplibre}
				/>
			</MapContainer>
			<form action={updateLocationMetadata}>
				<input type="hidden" name="entityType" defaultValue={entityType} />
				<input type="hidden" name="id" defaultValue={id} />
				<input type="hidden" name="entityId" defaultValue={entityId} />
				<input type="hidden" name="latName" defaultValue={latName} />
				<input type="hidden" name="lngName" defaultValue={lngName} />
				<input type="hidden" name="latValue" value={mapCenter.lat} />
				<input type="hidden" name="lngValue" value={mapCenter.lng} />

				<SubmitButton buttonText={buttonText} isDisabled={isSubmitDisabled} />
			</form>
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
