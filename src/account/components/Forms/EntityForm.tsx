import type { EntityData, EntityType } from "@/server";

type Props = {
	action: (formData: FormData) => void;
	entityType: EntityType;
	entityId: number;
	entity: EntityData;
};

export const EntityForm = ({ action, entityType, entityId, entity }: Props) => {
	const { name, location, description } = entity;

	return (
		<form action={action}>
			<input type="hidden" name="entityType" defaultValue={entityType} />
			<input type="hidden" name="entityId" defaultValue={entityId} />

			<label className="floating-label mb-3">
				<span>name</span>
				<input
					className="input input-sm"
					type="text"
					name="name"
					placeholder="name"
					defaultValue={name}
				/>
			</label>

			<label className="floating-label mb-3">
				<span>location</span>
				<input
					className="input input-sm"
					type="text"
					name="location"
					defaultValue={location}
				/>
			</label>

			<label className="floating-label mb-3">
				<span>Description</span>
				<textarea
					className="textarea textarea-sm"
					name="description"
					defaultValue={description}
				/>
			</label>
			<button className="btn btn-sm" type="submit">
				Update
			</button>
		</form>
	);
};
