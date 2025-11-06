import type { EntityType } from "@/server/types";

type Props = {
	entityType: EntityType;
	entityId: number;
};

export const HiddenInputs = ({ entityType, entityId }: Props) => (
	<>
		<input type="hidden" name="entityType" defaultValue={entityType} />
		<input type="hidden" name="entityId" defaultValue={entityId} />
	</>
);
