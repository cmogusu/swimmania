import { updateEntity } from "@/server/api/apiActions";
import type { EntityData, EntityType } from "@/server/types";
import { ClientEntityForm } from "./ClientEntityForm";
import { HiddenInputs } from "./HiddenInputs";
import { LocationInput } from "./LocationInput";
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
			<div>
				<form action={updateEntity}>
					<HiddenInputs entityType={entityType} entityId={entityId} />

					<TextInput name="name" title="Name" value={name} />

					<TextareaInput
						name="description"
						title="Description"
						value={description}
					/>

					<SubmitButton entityId={entityId}>
						<button type="submit">submit</button>
					</SubmitButton>
				</form>

				<LocationInput
					entityId={entityId}
					entityType={entityType}
					locationName={location}
				/>
			</div>
		</ClientEntityForm>
	);
};
