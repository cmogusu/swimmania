import type { EntityType } from "@/server/types";

type Props = {
	entityType: EntityType;
	entityId: number;
	userId: number;
};

export const HiddenInputs = ({ entityType, entityId, userId }: Props) => (
	<>
		<input type="hidden" name="entityType" defaultValue={entityType} />
		<input type="hidden" name="entityId" defaultValue={entityId} />
		<input type="hidden" name="userId" defaultValue={userId ?? 2} />
	</>
);
