import { api, type EntityType } from "@/server";
import { EditRelatedEntities } from "../EditRelatedEntities";
import { EditImages } from "./EditImages";
import { EditMetadata } from "./EditMetadata";
import { EntityForm } from "./EntityForm";

type Props = {
	entityType: EntityType;
	entityId: number;
};

const show = false;

export const EditEntity = async ({ entityType, entityId }: Props) => {
	const entity = await api.getEntity(entityType, entityId);
	const { images, metadata } = entity || {};

	if (!entity) {
		return "Oops, item not found";
	}

	return (
		<div>
			<section>
				<h1 className="mb-4">Edit: {entity.name}</h1>
				<EntityForm
					entityType={entityType}
					entityId={entityId}
					entity={entity}
				/>
			</section>

			{show && <EditImages entityId={entityId} images={images} />}

			{show && (
				<EditMetadata
					entityType={entityType}
					entityId={entityId}
					metadata={metadata}
				/>
			)}

			<EditRelatedEntities entityId={entityId} entityType={entityType} />
		</div>
	);
};
