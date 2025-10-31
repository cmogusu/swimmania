"use client";

import { useEffect, useState } from "react";
import { EditSingleLocationMap } from "@/components/GoogleMap";
import { getMetadata } from "@/server/api/apiActions";
import type { EntityType, RawMetadata } from "@/server/types";

type Props = {
	entityId: number;
	entityType: EntityType;
	title: string | undefined;
};

export const LocationInput = ({ entityId, entityType, title }: Props) => {
	const { isFetchComplete, locationMetadata } = useGetMetadata(
		entityType,
		entityId,
	);
	const { location, locationName, metadataId } =
		useGetLocation(locationMetadata);

	if (!entityId || !isFetchComplete) {
		return null;
	}

	return (
		<div>
			<h4>{title}</h4>
			<EditSingleLocationMap
				metadataId={metadataId}
				entityId={entityId}
				entityType={entityType}
				locationName={locationName as string}
				location={location}
			/>
		</div>
	);
};

const useGetMetadata = (entityType: EntityType, entityId: number) => {
	const [isFetchComplete, setIsFetchComplete] = useState<boolean>(false);
	const [locationMetadata, setLocationMetadata] = useState<RawMetadata[]>();

	useEffect(() => {
		if (!entityId || !entityType) {
			return;
		}

		const metadataNames = ["location.lat", "location.lng", "location.name"];
		getMetadata(entityType, entityId, metadataNames).then((metadata) => {
			setLocationMetadata(metadata);
			setIsFetchComplete(true);
		});
	}, [entityType, entityId]);

	return { isFetchComplete, locationMetadata };
};

const useGetLocation = (locationMetadata: RawMetadata[] | undefined) => {
	if (!locationMetadata) {
		return {};
	}

	const latValue = getValue(locationMetadata, "location.lat");
	const lngValue = getValue(locationMetadata, "location.lng");
	const locationName = getValue(locationMetadata, "location.name");
	const location =
		latValue?.value && lngValue?.value
			? {
					lat: Number(latValue.value),
					lng: Number(lngValue.value),
				}
			: undefined;

	return {
		location,
		locationName: locationName?.value,
		metadataId: latValue?.id,
	};
};

const getValue = (metadataArr: RawMetadata[], name: string) =>
	metadataArr?.find((m) => m.name === name);
