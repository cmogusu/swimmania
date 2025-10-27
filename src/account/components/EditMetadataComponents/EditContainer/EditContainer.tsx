import Form from "next/form";
import type { ReactNode } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { updateMetadata } from "@/server/api/apiActions";
import type { EntityType } from "@/server/types";

type Props = {
	id: number;
	name: string;
	entityType: EntityType;
	entityId: number;
	children: ReactNode;
};

export const EditContainer = ({
	id,
	name,
	entityType,
	entityId,
	children,
}: Props) => {
	const buttonText = id === -1 ? "Insert" : "Update";

	return (
		<Form action={updateMetadata} className="mb-4">
			<input type="hidden" name="entityType" defaultValue={entityType} />
			<input type="hidden" name="id" defaultValue={id} />
			<input type="hidden" name="entityId" defaultValue={entityId} />
			<input type="hidden" name="name" defaultValue={name} />

			{children}

			<SubmitButton buttonText={buttonText}>
				<button className="btn btn-sm" type="submit">
					{buttonText}
				</button>
			</SubmitButton>
		</Form>
	);
};
