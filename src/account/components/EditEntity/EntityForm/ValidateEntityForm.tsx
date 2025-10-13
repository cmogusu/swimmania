import { type PropsWithChildren, useCallback, useState } from "react";
import { updateEntity } from "@/server/api/apiActions";
import { InsertInputData } from "@/server/Managers/EntityManager/InputData";
import type { EntityData, EntityType } from "@/server/types";
import { HiddenInputs } from "./HiddenInputs";
import { SubmitButton } from "./SubmitButton";
import { TextareaInput } from "./TextareaInput";
import { TextInput } from "./TextInput";

type Props = PropsWithChildren & {
	entityType: EntityType;
	entityId: number;
	entity: EntityData;
};

type ValidationErrors = {
	name?: string;
	location?: string;
	description?: string;
};

export const ValidateEntityForm = ({ entityType, entityId, entity }: Props) => {
	const { name, location, description } = entity;
	const [errors, setErrors] = useState<ValidationErrors>({});

	const handleSubmit = useCallback((formData: FormData) => {
		const inputData = new InsertInputData({
			name: formData.get("name") as string,
			location: formData.get("location") as string,
			description: formData.get("description") as string,
		});

		try {
			inputData.validateData();
			updateEntity(formData);
		} catch (err) {
			// TODO: Find way to set error object
			// setErrors()
			console.log(err);
		}
	}, []);

	return (
		<form action={handleSubmit} method="POST">
			<HiddenInputs entityType={entityType} entityId={entityId} />

			<TextInput
				name="name"
				defaultValue={name}
				title="Name"
				error={errors.name}
			/>
			<TextInput
				name="location"
				defaultValue={location}
				title="Location"
				error={errors.location}
			/>
			<TextareaInput
				name="description"
				defaultValue={description}
				title="Description"
				error={errors.description}
			/>

			<SubmitButton entityId={entityId} />
		</form>
	);
};
