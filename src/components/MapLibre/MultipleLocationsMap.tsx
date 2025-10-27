"use client";

import type { Map as MapLibre } from "maplibre-gl";
import dynamic from "next/dynamic";
import { type ComponentType, useEffect, useRef, useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import type { EntityType } from "@/server/types";
import type { LatLng } from "@/types";
import type { BaseMaplibreProps } from "./BaseMaplibreMap";

const BaseMaplibreMap: ComponentType<BaseMaplibreProps> = dynamic(
	() => import("./BaseMaplibreMap"),
);

type Props = {
	id: number;
	latName: string;
	lngName: string;
	entityId: number;
	entityType: EntityType;
	styleUrl: string;
	center: LatLng;
};

export const EditSingleLocationMap = async ({
	id,
	latName,
	lngName,
	entityId,
	entityType,
	center,
	styleUrl,
}: Props) => {
	const [mapCenter, setMapCenter] = useState<LatLng>(center);
	const mapRef = useRef<MapLibre | null>(null);
	const buttonText = id === -1 ? "Insert" : "Update";

	useEffect(() => {
		const { current: maplibre } = mapRef;

		if (!maplibre) {
			return;
		}

		maplibre.on("click", (event) => {
			console.log(event);
			// setMapCenter()
		});
	}, []);

	return (
		<div className="mb-4">
			<BaseMaplibreMap styleUrl={styleUrl} center={mapCenter} mapRef={mapRef} />
			<form action="">
				<input type="hidden" name="entityType" defaultValue={entityType} />
				<input type="hidden" name="id" defaultValue={id} />
				<input type="hidden" name="entityId" defaultValue={entityId} />
				<input type="hidden" name="latName" defaultValue={latName} />
				<input type="hidden" name="latValue" value={mapCenter.lat} />
				<input type="hidden" name="lngName" defaultValue={lngName} />
				<input type="hidden" name="lngValue" value={mapCenter.lng} />

				<SubmitButton buttonText={buttonText}>
					<button className="btn btn-sm" type="submit">
						{buttonText}
					</button>
				</SubmitButton>
			</form>
		</div>
	);
};
