"use client";

import { logError } from "@/utilities";
import { BaseMaplibreMap } from "./BaseMaplibreMap";

type Props = {
	styleUrl: string;
};

export default function MaplibreMap({ styleUrl }: Props) {
	if (!styleUrl) {
		logError("Maplibre style url not set");
		return;
	}

	return <BaseMaplibreMap styleUrl={styleUrl} />;
}
