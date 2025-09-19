import Form from "next/form";
import type { ReactNode } from "react";
import type { EntityType, IMetadataPropertyType } from "@/server";
import { insertMetadata, updateMetadata } from "@/server";
import { SubmitButton } from "../../SubmitButton";

type Props = {
	entityType: EntityType;
	entityId: number;
	metadataType: IMetadataPropertyType;
	children: ReactNode;
};

export const EditContainer = ({
	entityType,
	entityId,
	metadataType,
	children,
}: Props) => {
	const { id, name } = metadataType;
	const action = id === -1 ? insertMetadata : updateMetadata;
	const buttonText = id === -1 ? "Insert" : "Update";

	return (
		<Form action={action} className="mb-4">
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
