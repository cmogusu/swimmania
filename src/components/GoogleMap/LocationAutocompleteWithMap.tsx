"use client";

import { importLibrary } from "@googlemaps/js-api-loader";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";
import { useApiKeyContext } from "@/context";
import type { LatLng } from "@/types";
import { logError } from "@/utilities/log";
import { GoogleMap } from "./GoogleMap";
import { LocationAutocomplete } from "./LocationAutocomplete";

export type LocationAutocompleteWithMapProps = {
	title?: string;
	location?: LatLng;
	locationName?: string;
	setLocation: (location: LatLng) => void;
	setLocationName: (locationName: string) => void;
};

export default function LocationAutocompleteWithMap({
	title,
	location,
	locationName,
	setLocation,
	setLocationName,
}: LocationAutocompleteWithMapProps) {
	const [viewport, setViewport] = useState<
		google.maps.LatLngBounds | undefined
	>();
	const { google: googleApiKey } = useApiKeyContext();
	const geocoder = useGetGeocoder(googleApiKey);

	const handlePlaceSelect = useCallback(
		(place: google.maps.places.PlaceResult) => {
			const { geometry, formatted_address: locationName } = place;
			const { viewport, location } = geometry || {};
			if (location?.toJSON) setLocation(location?.toJSON());
			if (viewport) setViewport(viewport);
			if (locationName) setLocationName(locationName);
		},
		[setLocationName, setLocation],
	);

	const handleSetLocation = useCallback(
		(location: LatLng) => {
			geocoder?.geocode({ location }).then(({ results }) => {
				const { formatted_address: locationName } = results[0] || {};
				if (locationName) setLocationName(locationName);
			});
		},
		[geocoder, setLocationName],
	);

	if (!googleApiKey) {
		return null;
	}

	return (
		<APIProvider apiKey={googleApiKey}>
			<LocationAutocomplete
				title={title}
				locationName={locationName}
				setLocationName={setLocationName}
				onPlaceSelect={handlePlaceSelect}
			/>
			<GoogleMap
				center={location}
				viewport={viewport}
				onSetLocation={handleSetLocation}
			/>
		</APIProvider>
	);
}

const useGetGeocoder = (googleApiKey: string) => {
	const [geocoder, setGeocoder] = useState<google.maps.Geocoder | undefined>();

	useEffect(() => {
		if (!googleApiKey) {
			return;
		}

		// TODO: update to use useMapsLibrary("geocoding");
		importLibrary("geocoding")
			.then(({ Geocoder }) => new Geocoder())
			.then(setGeocoder)
			.catch((e: unknown) =>
				logError(`Unable to get geocoder: ${(e as Error)?.message}`),
			);
	}, [googleApiKey]);

	return geocoder;
};
