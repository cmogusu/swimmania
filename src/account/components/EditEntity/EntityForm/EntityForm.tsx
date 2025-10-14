import type { EntityData, EntityType } from "@/server";
import { updateEntity } from "@/server";
import { ClientEntityForm } from "./ClientEntityForm";
import { HiddenInputs } from "./HiddenInputs";
import { SubmitButton } from "./SubmitButton";
import { TextareaInput } from "./TextareaInput";
import { TextInput } from "./TextInput";

type Props = {
	entityType: EntityType;
	entityId: number;
	entity: EntityData;
};

export const EntityForm = (props: Props) => {
	const { entityType, entityId, entity } = props;
	const { name, location, description } = entity;

	return (
		<ClientEntityForm {...props}>
			<form action={updateEntity}>
				<HiddenInputs entityType={entityType} entityId={entityId} />

				<TextInput name="name" title="Name" value={name} />
				<TextInput name="location" title="Location" value={location} />
				<TextareaInput
					name="description"
					title="Description"
					value={description}
				/>

				<SubmitButton entityId={entityId}>
					<button type="submit">submit</button>
				</SubmitButton>
			</form>
		</ClientEntityForm>
	);
};
