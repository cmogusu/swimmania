"use client";

import { useEffect, useMemo } from "react";
import { useEntityLocationContext } from "@/context";
import type { MetadataProps } from "../types";

export default function ({ entityId, metadata }: MetadataProps) {
	const { setEntityLocation } = useEntityLocationContext();

	useEffect(() => {
		const lat = metadata["location.lat"];
		const lng = metadata["location.lng"];
		if (lat && lng) {
			return setEntityLocation({
				entityId,
				lat: Number(lat),
				lng: Number(lng),
			});
		}
	}, [setEntityLocation, metadata, entityId]);

	const metadataComponents = useMemo(() => {
		const components = [];

		for (const key in metadata) {
			components.push(
				<div key={key}>
					{key}: {metadata[key]}
				</div>,
			);
		}

		return components;
	}, [metadata]);

	return <div>{metadataComponents}</div>;
}
