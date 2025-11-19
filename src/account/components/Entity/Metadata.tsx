import { metadataComponents } from "@/components/MetadataComponents";
import { api } from "@/server/api";
import { entityMetadataFactory } from "@/server/Managers";
import type {
	EntityType,
	IMetadataPropertyType,
	RawMetadata,
} from "@/server/types";

type Props = {
	entityId: number;
	entityType: EntityType;
};

export const Metadata = async ({ entityId, entityType }: Props) => {
	const metadata = await api.getMetadata(entityType, entityId);
	const metadataComponents = getMetadataComponents(entityType, metadata);

	return (
		<section className="mb-4">
			<h2>Metadata</h2>
			<hr className="w-50 mb-4" />
			<div>{metadataComponents}</div>
		</section>
	);
};

const getMetadataComponents = (
	entityType: EntityType,
	metadata: RawMetadata | undefined,
) => {
	const entityMetadata = metadata
		? entityMetadataFactory.getInstance(entityType, metadata)
		: null;

	if (!entityMetadata) {
		return undefined;
	}

	return entityMetadata.metadata.map((metadataType: IMetadataPropertyType) => {
		const { name, type } = metadataType;
		const MetadataComponent = metadataComponents[type];
		return <MetadataComponent key={name} metadataType={metadataType} />;
	});
};
