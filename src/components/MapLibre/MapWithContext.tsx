"use client";

import { MapComponentsProvider } from "@mapcomponents/react-maplibre";
import { MapWithAnimation } from "./Map";

export default function MapWithContext() {
	return (
		<MapComponentsProvider>
			<MapWithAnimation />
		</MapComponentsProvider>
	);
}
