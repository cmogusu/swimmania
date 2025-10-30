"use client";

import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

type Props = {
	locationName: string | undefined;
	onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
};

export const LocationAutocomplete = ({
	locationName,
	onPlaceSelect,
}: Props) => {
	const [placeAutocomplete, setPlaceAutocomplete] =
		useState<google.maps.places.Autocomplete | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const places = useMapsLibrary("places");

	useEffect(() => {
		if (
			inputRef.current &&
			locationName &&
			inputRef.current.value !== locationName
		) {
			inputRef.current.value = locationName;
		}
	}, [locationName]);

	useEffect(() => {
		if (!places || !inputRef.current) {
			return;
		}

		const options = {
			fields: ["geometry", "formatted_address"],
		};

		setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
	}, [places]);

	useEffect(() => {
		if (!placeAutocomplete) return;

		placeAutocomplete.addListener("place_changed", () => {
			const place = placeAutocomplete.getPlace();
			if (place) onPlaceSelect(place);
		});
	}, [onPlaceSelect, placeAutocomplete]);

	return (
		<div className="autocomplete-container">
			<input
				ref={inputRef}
				className="input input-sm"
				defaultValue={locationName || ""}
			/>
		</div>
	);
};
