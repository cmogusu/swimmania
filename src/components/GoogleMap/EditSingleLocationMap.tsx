"use client";

import dynamic from "next/dynamic";
import { type ComponentType, useState } from "react";
import type { EntityType } from "@/server/types";
import type { LatLng } from "@/types";
import { FixedMapContainer } from "../MapContainer";
import { EditLocationForm } from "../MapLibre/EditLocationForm";
import type { LocationAutocompleteWithMapProps } from "./LocationAutocompleteWithMap";

type Props = {
	id: number;
	locationName?: string;
	latName: string;
	lngName: string;
	latValue: number;
	lngValue: number;
	entityId: number;
	entityType: EntityType;
	center?: LatLng;
	zoom?: number;
};

const LocationAutocompleteWithMap: ComponentType<LocationAutocompleteWithMapProps> =
	dynamic(() => import("./LocationAutocompleteWithMap"));

export const EditSingleLocationMap = ({
	id,
	latName,
	lngName,
	latValue,
	lngValue,
	entityId,
	entityType,
	center,
	...rest
}: Props) => {
	const initialLocation =
		latValue || lngValue
			? {
					lat: latValue,
					lng: lngValue,
				}
			: undefined;

	const [location, setLocation] = useState<LatLng | undefined>(initialLocation);
	const [locationName, setLocationName] = useState<string | undefined>(
		rest.locationName,
	);
	const isSubmitDisabled = getIsSubmitDisabled(
		locationName,
		location,
		initialLocation,
	);

	return (
		<div className="mb-4">
			<FixedMapContainer>
				<LocationAutocompleteWithMap
					location={location}
					locationName={locationName}
					setLocation={setLocation}
					setLocationName={setLocationName}
				/>
			</FixedMapContainer>
			<EditLocationForm
				id={id}
				entityId={entityId}
				entityType={entityType}
				latName={latName}
				lngName={lngName}
				latValue={location?.lat}
				lngValue={location?.lng}
				isSubmitDisabled={isSubmitDisabled}
			>
				<input type="hidden" name="location" value={locationName} />
			</EditLocationForm>
		</div>
	);
};

const getIsSubmitDisabled = (
	locationName: string | undefined,
	location: LatLng | undefined,
	initialLocation: LatLng | undefined,
) => {
	if (!locationName || !location) {
		return true;
	}

	return (
		location?.lat === initialLocation?.lat &&
		location?.lng === initialLocation?.lng
	);
};
