"use client";

import { useMapsLibrary } from "@vis.gl/react-google-maps";
import {
	type ChangeEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

type Props = {
	locationName: string | undefined;
	setLocationName: (v: string) => void;
	onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
};

export const LocationAutocomplete = ({
	locationName,
	setLocationName,
	onPlaceSelect,
}: Props) => {
	const inputRef = useListenForPlaceChanges(onPlaceSelect);

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.target;
			setLocationName(value);
		},
		[setLocationName],
	);

	return (
		<div className="autocomplete-container">
			<input
				ref={inputRef}
				className="input input-sm"
				value={locationName}
				onChange={handleChange}
			/>
		</div>
	);
};

const useListenForPlaceChanges = (
	onPlaceSelect: (place: google.maps.places.PlaceResult) => void,
) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const places = useMapsLibrary("places");
	const [placeAutocomplete, setPlaceAutocomplete] =
		useState<google.maps.places.Autocomplete | null>(null);

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

	return inputRef;
};
