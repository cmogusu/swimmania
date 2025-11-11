"use client";

import dynamic from "next/dynamic";
import { type ComponentType, useState } from "react";
import type { EntityType } from "@/server/types";
import type { LatLng } from "@/types";
import { FixedMapContainer } from "../MapContainer";
import { EditLocationForm } from "../MapLibre/EditLocationForm";
import type { LocationAutocompleteWithMapProps } from "./LocationAutocompleteWithMap";

type Props = {
	entityId: number;
	entityType: EntityType;
	location: LatLng | undefined;
	locationName: string | undefined;
	zoom?: number;
};

const LocationAutocompleteWithMap: ComponentType<LocationAutocompleteWithMapProps> =
	dynamic(() => import("./LocationAutocompleteWithMap"));

export const EditSingleLocationMap = ({
	entityId,
	entityType,
	...props
}: Props) => {
	const [location, setLocation] = useState<LatLng | undefined>(props.location);
	const [locationName, setLocationName] = useState<string | undefined>(
		props.locationName,
	);

	const isSubmitDisabled = !locationName || !location?.lat || !location?.lng;

	return (
		<div className="mb-4" style={{ width: "500px" }}>
			<FixedMapContainer>
				<LocationAutocompleteWithMap
					location={location}
					locationName={locationName}
					setLocation={setLocation}
					setLocationName={setLocationName}
				/>
			</FixedMapContainer>
			<EditLocationForm
				entityId={entityId}
				entityType={entityType}
				latValue={location?.lat}
				lngValue={location?.lng}
				locationName={locationName}
				isSubmitDisabled={isSubmitDisabled}
			/>
		</div>
	);
};
