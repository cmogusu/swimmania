import { addEntity as addEntityAction, type EntityType } from "@/server";
import { EditImages, EditMetadata } from "../EditEntity";
import { EntityForm } from "../Forms";
import { createEmptyEntity } from "./utils";

type Props = {
	entityType: EntityType;
};

const show = false;

export const AddEntity = async ({ entityType }: Props) => {
	const entity = createEmptyEntity(entityType);
	const { images, metadata } = entity || {};

	if (!entity) {
		return "Oops, item not found";
	}

	return (
		<div>
			<section>
				<h1 className="mb-4">Add</h1>
				<EntityForm
					entityId={-1}
					entityType={entityType}
					entity={entity}
					action={addEntityAction}
				/>
			</section>

			{show && <EditImages entityId={-1} images={images} />}
			{show && (
				<EditMetadata
					entityType={entityType}
					entityId={-1}
					metadata={metadata}
				/>
			)}
		</div>
	);
};
