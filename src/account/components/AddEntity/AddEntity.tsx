import { getLoggedInUserId } from "@/server/api";
import type { EntityData, EntityType } from "@/server/types";
import { EntityForm } from "../EditEntity";

type Props = {
	entityType: EntityType;
};

export const AddEntity = async ({ entityType }: Props) => {
	const loggedInUserId = await getLoggedInUserId();
	const entity = createEmptyEntity(entityType);

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
