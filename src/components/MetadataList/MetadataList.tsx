import { type ReactNode, Suspense } from "react";
import { api } from "@/server/api";
import type { EntityType, RawMetadata } from "@/server/types";
import { Loading } from "../Loading";

type Props = {
	entityType: EntityType;
	entityId: number;
	names: string[];
	render: (metadataArr: RawMetadata[]) => ReactNode;
};

export const MetadataList = async ({
	render,
	entityType,
	entityId,
	names,
}: Props) => {
	const metadataArr = await api.getMetadataList(entityType, entityId, names);
	return (
		<Suspense fallback={<Loading />}>
			{metadataArr ? render(metadataArr) : null}
		</Suspense>
	);
};
