import { entityMetadataFactory } from "@/server/Managers";
import type {
	EntityType,
	IMetadataPropertyType,
	MetadataData,
} from "@/server/types";
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
		const EditMetadataComponent = editMetadataComponents[type];
		return (
			<EditMetadataComponent
				key={name}
				entityId={entityId}
				entityType={entityType}
				metadataType={metadataType}
			/>
		);
	});
};
