"use client";

import { useRef } from "react";
import { BaseMaplibreMap } from "@/components/MapLibre/";
import type { MapRef } from "./type";

type Props = {
	lat: number;
	lng: number;
	styleUrl: string;
};

export const ViewMap = ({ styleUrl, lat, lng }: Props) => {
	const mapRef = useRef<MapRef>(null);

	return (
		<BaseMaplibreMap
			ref={mapRef}
			styleUrl={styleUrl}
			center={[lng, lat]}
			zoom={16}
		/>
	);
};
