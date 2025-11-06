import { updateEntity } from "@/server/api/apiActions";
import {
	EditEntityDescriptionText,
	EditEntityNameText,
} from "@/server/constants";
import type { EntityData, EntityType } from "@/server/types";
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
	const { name, description } = entity;

	return (
		<ClientEntityForm {...props}>
			<form action={updateEntity}>
				<HiddenInputs entityType={entityType} entityId={entityId} />

				<TextInput
					name="name"
					title={EditEntityNameText[entityType]}
					value={name}
				/>

				<TextareaInput
					name="description"
					title={EditEntityDescriptionText[entityType]}
					value={description}
				/>

				<SubmitButton entityId={entityId}>
					<button type="submit">submit</button>
				</SubmitButton>
			</form>
		</ClientEntityForm>
	);
};
