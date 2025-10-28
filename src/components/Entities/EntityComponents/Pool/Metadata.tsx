"use client";

import { useEffect } from "react";
import { useEntityLocationContext } from "@/context";
import type { MetadataValue, RawMetadata } from "@/server/types";
import type { MetadataProps } from "../types";

export default function ({ entityId, metadataArr }: MetadataProps) {
	const { setEntityLocation } = useEntityLocationContext();

	useEffect(() => {
		const metadataObj = arrayToObj(metadataArr);
		const lat = metadataObj["location.lat"];
		const lng = metadataObj["location.lng"];
		if (lat && lng) {
			return setEntityLocation({
				entityId,
				lat: Number(lat),
				lng: Number(lng),
			});
		}
	}, [setEntityLocation, metadataArr, entityId]);

	return (
		<div>
			{metadataArr.map((m) => (
				<div key={m.name}>
					{m.name}: {m.value}
				</div>
			))}
		</div>
	);
}

const arrayToObj = (metadataArr: RawMetadata[]) =>
	metadataArr.reduce(
		(acc, metadata) => {
			acc[metadata.name] = metadata.value;
			return acc;
		},
		{} as Record<string, MetadataValue | undefined>,
	);
