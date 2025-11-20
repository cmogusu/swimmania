import type { Map as MapLibre } from "maplibre-gl";
import type { LatLng } from "@/types";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapContainer } from "./MapContainer";
import { MapContent } from "./MapContent";

export type MaplibreProps = {
	center?: LatLng;
	zoom?: number;
	setMaplibre: (map: MapLibre) => void;
};

export default function MaplibreMap({
	center,
	zoom,
	setMaplibre,
}: MaplibreProps) {
	return (
		<MapContainer center={center} zoom={zoom} setMaplibre={setMaplibre}>
			<MapContent />
		</MapContainer>
	);
}
