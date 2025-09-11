import type { EntityType } from "@/server";

type Props = {
	entityType: EntityType;
	entityId: number;
	id: number;
	name: string;
	currentPath: string;
};

export const HiddenInputs = ({
	currentPath,
	entityType,
	id,
	entityId,
	name,
}: Props) => (
	<>
		<input type="hidden" name="entityType" defaultValue={entityType} />
		<input type="hidden" name="id" defaultValue={id} />
		<input type="hidden" name="entityId" defaultValue={entityId} />
		<input type="hidden" name="name" defaultValue={name} />
		<input type="hidden" name="currentPath" defaultValue={currentPath} />
	</>
);
