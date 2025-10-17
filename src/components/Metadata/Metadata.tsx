import {
	type EntityType,
	entityMetadataFactory,
	type IMetadataPropertyType,
	type MetadataData,
} from "@/server";
import { metadataComponents } from "./metadataComponents";

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

const getMetadataComponents = (
	entityType: EntityType,
	metadata: MetadataData[] | undefined,
) => {
	const entityMetadata = metadata?.length
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
