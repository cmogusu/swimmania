import {
	EntityMetadataFactory,
	type EntityType,
	type IMetadataType,
	type MetadataData,
} from "@/server";
import { editMetadataComponents } from "../EditMetadataComponents";

type Props = {
	entityType: EntityType;
	entityId: number;
	metadata: MetadataData[] | undefined;
};

export const EditMetadata = ({ entityType, entityId, metadata }: Props) => {
	const metadataComponents = getMetadataComponents(
		entityType,
		entityId,
		metadata,
	);

	return (
		<section className="mb-4">
			<h2>Metadata</h2>
			<div>{metadataComponents}</div>
		</section>
	);
};

const getMetadataComponents = (
	entityType: EntityType,
	entityId: number,
	metadata: MetadataData[] | undefined,
) => {
	const entityMetadata = metadata?.length
		? EntityMetadataFactory.getInstance(entityType, metadata)
		: null;

	if (!entityMetadata) {
		return undefined;
	}

	return entityMetadata.metadata.map((metadataType: IMetadataType) => {
		const { name, type } = metadataType;
		const MetadataComponent = editMetadataComponents[type];
		return (
			<MetadataComponent
				key={name}
				entityId={entityId}
				entityType={entityType}
				metadataType={metadataType}
			/>
		);
	});
};
