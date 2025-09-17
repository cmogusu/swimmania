import {
	type EntityType,
	entityMetadataFactory,
	type IMetadataPropertyType,
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
	const entityMetadata = entityMetadataFactory.getInstance(
		entityType,
		metadata,
		true,
	);

	if (!entityMetadata) {
		throw Error("entityMetadata not created");
	}

	return entityMetadata.metadata.map((metadataType: IMetadataPropertyType) => {
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
