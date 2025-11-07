import type { EntityData, EntityType, RelationshipType } from "@/server/types";

type Props = {
	entity: EntityData;
	entityId: number;
	entityType: EntityType;
	relationshipType: RelationshipType;
	formAction: (formData: FormData) => void;
	buttonText: string;
};

export const EntityForm = ({
	entity,
	entityId,
	entityType,
	relationshipType,
	formAction,
	buttonText,
}: Props) => (
	<form action={formAction}>
		<input type="hidden" name="entityType" value={entityType} />
		<input type="hidden" name="entityId" value={entityId} />
		<input type="hidden" name="relatedEntityType" value={entity.type} />
		<input type="hidden" name="relatedEntityId" value={entity.entityId} />
		<input type="hidden" name="relationshipType" value={relationshipType} />
		<button type="submit" className="btn btn-sm">
			{buttonText}
		</button>
	</form>
);
