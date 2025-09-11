import type { ReactNode } from "react";
import type { EntityType } from "@/server";
import { updateMetadata } from "@/server";

type Props = {
	entityType: EntityType;
	entityId: number;
	id: number;
	name: string;
	currentPath: string;
	children: ReactNode;
};

export const EditContainer = ({
	entityType,
	entityId,
	id,
	name,
	currentPath,
	children,
}: Props) => {
	return (
		<form action={updateMetadata} className="mb-4">
			<input type="hidden" name="entityType" defaultValue={entityType} />
			<input type="hidden" name="id" defaultValue={id} />
			<input type="hidden" name="entityId" defaultValue={entityId} />
			<input type="hidden" name="name" defaultValue={name} />
			<input type="hidden" name="currentPath" defaultValue={currentPath} />

			{children}

			<button className="btn btn-sm" type="submit">
				Update
			</button>
		</form>
	);
};
