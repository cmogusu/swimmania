import { useEffect, useState } from "react";
import { getMetadata } from "@/server/api/apiActions";
import { EntitiesMetadataList } from "@/server/constants";
import type { EntityType, RawMetadata } from "@/server/types";

export const useLoadMetadata = (entityType: EntityType, entityId: number) => {
	const metadataNames = EntitiesMetadataList[entityType];
	const [metadata, setMetadata] = useState<RawMetadata>();

	useEffect(() => {
		getMetadata(entityType, entityId, metadataNames).then((metadata) => {
			setMetadata(metadata);
		});
	}, [entityType, entityId, metadataNames]);

	return metadata;
};
