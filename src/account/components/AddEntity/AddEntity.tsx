import { getLoggedInUserId } from "@/server/api";
import type { EntityData, EntityType } from "@/server/types";
import { EditImages, EditMetadata, EntityForm } from "../EditEntity";

type Props = {
	entityType: EntityType;
};

const show = false;

export const AddEntity = async ({ entityType }: Props) => {
	const loggedInUserId = await getLoggedInUserId();
	const entity = createEmptyEntity(entityType);
	const { images } = entity || {};

	return (
		<div>
			<section>
				<h1 className="mb-4">Add</h1>
				<EntityForm
					entityId={-1}
					entityType={entityType}
					entity={entity}
					userId={loggedInUserId}
				/>
			</section>

			{show && <EditImages entityId={-1} images={images} />}
			{show && <EditMetadata entityType={entityType} entityId={-1} />}
		</div>
	);
};

const createEmptyEntity = (entityType: EntityType): EntityData => {
	return {
		id: -1,
		type: entityType,
		name: "",
		description: "",
		userId: -1,
		defaultImage: undefined,
		images: [],
	};
};
