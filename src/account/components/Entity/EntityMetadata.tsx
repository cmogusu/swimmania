import {
	EntityMetadataFactory,
	type EntityType,
	type IMetadataType,
	type MetadataData,
} from "@/server";
import { metadataComponents } from "../MetadataComponents";

type Props = {
	entityType: EntityType;
	metadata: MetadataData[] | undefined;
};

export const EntityMetadata = ({ entityType, metadata }: Props) => {
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
	metadata: MetadataData[] | undefined,
) => {
	const entityMetadata = metadata?.length
		? EntityMetadataFactory.getInstance(entityType, metadata)
		: null;

	if (!entityMetadata) {
		return undefined;
	}

	return entityMetadata.metadata
		.filter((m) => m.hasValue)
		.map((metadataType: IMetadataType) => {
			const { id, type } = metadataType;
			const MetadataComponent = metadataComponents[type];
			return <MetadataComponent key={id} metadataType={metadataType} />;
		});
};
