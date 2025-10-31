"use client";

import { useEffect, useState } from "react";
import { EditSingleLocationMap } from "@/components/GoogleMap";
import { getMetadata } from "@/server/api/apiActions";
import type { EntityType, RawMetadata } from "@/server/types";

type Props = {
	entityId: number;
	entityType: EntityType;
	locationName: string | undefined;
};

export const LocationInput = ({
	entityId,
	entityType,
	locationName,
}: Props) => {
	const { isFetchComplete, locationMetadata } = useGetMetadata(
		entityType,
		entityId,
	);
	const { location, metadataId } = useGetLocation(locationMetadata);

	if (!entityId || !isFetchComplete) {
		return null;
	}

	return (
		<EditSingleLocationMap
			metadataId={metadataId}
			entityId={entityId}
			entityType={entityType}
			locationName={locationName}
			location={location}
		/>
	);
};

const useGetMetadata = (entityType: EntityType, entityId: number) => {
	const [isFetchComplete, setIsFetchComplete] = useState<boolean>(false);
	const [locationMetadata, setLlocationMetadata] = useState<RawMetadata[]>();

	useEffect(() => {
		if (!entityId || !entityType) {
			return;
		}

		getMetadata(entityType, entityId, ["location.lat", "location.lng"]).then(
			(metadata) => {
				setLlocationMetadata(metadata);
				setIsFetchComplete(true);
			},
		);
	}, [entityType, entityId]);

	return { isFetchComplete, locationMetadata };
};

const useGetLocation = (locationMetadata: RawMetadata[] | undefined) => {
	if (!locationMetadata) {
		return {};
	}

	const latValue = locationMetadata?.find((m) => m.name === "location.lat");
	const lngValue = locationMetadata?.find((m) => m.name === "location.lng");
	const location =
		latValue?.value && lngValue?.value
			? {
					lat: Number(latValue.value),
					lng: Number(lngValue.value),
				}
			: undefined;

	return { location, metadataId: latValue?.id };
};
