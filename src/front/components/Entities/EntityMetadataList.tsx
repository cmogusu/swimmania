import { type JSX, Suspense } from "react";
import { Loading } from "@/components/Loading";
import { api } from "@/server/api";
import type { EntityType, RawMetadata } from "@/server/types";

type Props = {
	entityType: EntityType;
	entityId: number;
	names: string[];
	render: (metadataArr: RawMetadata[]) => JSX.Element;
};

export const EntityMetadataList = async ({
	render,
	entityType,
	entityId,
	names,
}: Props) => {
	if (!names.length) {
		return null;
	}

	const metadataArr = await api.getMetadataList(entityType, entityId, names);

	return (
		<Suspense fallback={<Loading />}>
			{metadataArr?.length ? render(metadataArr) : null}
		</Suspense>
	);
};
