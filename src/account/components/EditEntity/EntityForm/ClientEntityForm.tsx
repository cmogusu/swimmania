"use client";

import {
	type ChangeEvent,
	type PropsWithChildren,
	useActionState,
	useCallback,
	useMemo,
	useState,
} from "react";
import { updateEntity } from "@/server/api/apiActions";
import { Validate } from "@/server/Managers/EntityManager/InputData/Validate";
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

type ValidationErrors = Record<string, string>;

const updateEntityAction = (_state: unknown, formData: FormData) =>
	updateEntity(formData);

export const ClientEntityForm = (props: Props) => {
	const [, formAction] = useActionState(updateEntityAction, undefined);
	const [entity, setEntity] = useState<EntityData>(props.entity);
	const [errors, setErrors] = useState<ValidationErrors>({});

	const validator = useMemo(() => new Validate(), []);
	const handleUpdate = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = event.target;
			setEntity((prevEntity) => ({
				...prevEntity,
				[name]: value,
			}));

			const error = validator.validate(name, value);
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: error || "",
			}));
		},
		[validator],
	);

	return (
		<form action={formAction}>
			<HiddenInputs entityType={props.entityType} entityId={props.entityId} />

			<TextInput
				name="name"
				title="Name"
				error={errors.name}
				value={entity.name}
				onChange={handleUpdate}
			/>
			<TextInput
				name="location"
				title="Location"
				error={errors.location}
				value={entity.location}
				onChange={handleUpdate}
			/>
			<TextareaInput
				name="description"
				title="Description"
				error={errors.description}
				value={entity.description}
				onChange={handleUpdate}
			/>

			<SubmitButton entityId={props.entityId} />
		</form>
	);
};
