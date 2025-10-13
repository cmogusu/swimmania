import type { EntityData, EntityType } from "@/server";
import { updateEntity } from "@/server";
import { HiddenInputs } from "./HiddenInputs";
import { SubmitButton } from "./SubmitButton";
import { TextareaInput } from "./TextareaInput";
import { TextInput } from "./TextInput";

type Props = {
	entityType: EntityType;
	entityId: number;
	entity: EntityData;
};

export const EntityForm = ({ entityType, entityId, entity }: Props) => {
	const { name, location, description } = entity;

	return (
		<form action={updateEntity}>
			<HiddenInputs entityType={entityType} entityId={entityId} />

			<TextInput name="name" defaultValue={name} title="Name" />
			<TextInput name="location" defaultValue={location} title="Location" />
			<TextareaInput
				name="description"
				defaultValue={description}
				title="Description"
			/>

			<SubmitButton entityId={entityId} />
		</form>
	);
};
