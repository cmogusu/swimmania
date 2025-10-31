import { redirect } from "next/navigation";
import { api, getLoggedInUserId } from "@/server/api";
import type { EntityType } from "@/server/types";
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
	const loggedInUserId = await getLoggedInUserId();
	const entity = await api.getEntity(entityType, entityId);
	const { images } = entity || {};

	if (!loggedInUserId) {
		return redirect("/login");
	}

	if (!entity) {
		return "Oops, item not found";
	}

	if (loggedInUserId !== entity.userId) {
		return (
			<div>
				<p>Ooops! No permission to edit file</p>
				<p>
					Go to <a href={`/account/${entityType}`}>profile page</a>
				</p>
			</div>
		);
	}

	return (
		<div>
			<section>
				<h1 className="mb-4">Edit: {entity.name}</h1>
				<EntityForm
					entityType={entityType}
					entityId={entityId}
					entity={entity}
					userId={loggedInUserId}
				/>
			</section>

			{show && <EditImages entityId={entityId} images={images} />}

			{show && <EditMetadata entityType={entityType} entityId={entityId} />}

			{show && (
				<EditRelatedEntities entityId={entityId} entityType={entityType} />
			)}
		</div>
	);
};
