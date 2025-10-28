import { type Map as MapLibre, Marker } from "maplibre-gl";
import type { LatLng } from "@/types";

export const createMarker = (maplibre: MapLibre, position: LatLng) => {
	const marker = new Marker({
		color: "#199601",
	});

	marker.setLngLat(position);
	marker.addTo(maplibre);
	return marker;
};
