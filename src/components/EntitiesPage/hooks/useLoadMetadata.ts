import { useEffect, useState } from "react";
import { getMetadata } from "@/server/api/apiActions";
import { EntitiesMetadataList } from "@/server/constants";
import type { EntityType, RawMetadata } from "@/server/types";
import { throttle } from "@/utilities/general";

const throttledGetMetadata = throttle(getMetadata, 500);

export const useLoadMetadata = (
	entityType: EntityType,
	entityId: number,
	isVisible: boolean,
) => {
	const [metadata, setMetadata] = useState<RawMetadata>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const metadataNames = EntitiesMetadataList[entityType];

	useEffect(() => {
		if (isVisible) {
			setIsLoading(true);
			throttledGetMetadata(entityType, entityId, metadataNames)
				.then((metadata) => {
					setMetadata(metadata);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	}, [entityType, entityId, metadataNames, isVisible]);

	return { isLoading, metadata };
};
