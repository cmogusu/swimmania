import type { EntityType, MetadataData } from "@/server/types";
import { getMetadataComponents } from "./metadataComponents";

type Props = {
	entityType: EntityType;
	metadata: MetadataData[] | undefined;
};

export const Metadata = ({ entityType, metadata }: Props) => {
	const metadataComponents = getMetadataComponents(entityType, metadata);

	return (
		<section className="mb-4">
			<h2>Metadata</h2>
			<hr className="w-50 mb-4" />
			<div>{metadataComponents}</div>
		</section>
	);
};
