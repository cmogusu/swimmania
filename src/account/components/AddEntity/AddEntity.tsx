import {
	addEntity as addEntityAction,
	type EntityData,
	type EntityType,
} from "@/server";
import { EditImages, EditMetadata, EntityForm } from "../EditEntity";

type Props = {
	entityType: EntityType;
};

const show = false;

export const AddEntity = async ({ entityType }: Props) => {
	const entity = createEmptyEntity(entityType);
	const { images, metadata } = entity || {};

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

const createEmptyEntity = (entityType: EntityType): EntityData => {
	return {
		id: -1,
		type: entityType,
		name: "",
		description: "",
		location: "",
		defaultImage: undefined,
		images: [],
		metadata: [],
	};
};
