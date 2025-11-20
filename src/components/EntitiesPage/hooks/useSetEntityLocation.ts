import { useEffect } from "react";
import { useEntityLocationContext } from "@/context";
import type { RawMetadata } from "@/server/types";

export const useSetEntityLocation = (
	entityId: number,
	metadata?: RawMetadata,
) => {
	const { setEntityLocation } = useEntityLocationContext();

	useEffect(() => {
		if (!metadata?.["location.lat"] || !metadata?.["location.lat"]) {
			return;
		}

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
};
