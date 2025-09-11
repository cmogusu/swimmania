import { api, type EntityType, updateEntity } from "@/server";
import { EditImages } from "./EditImages";
import { EditMetadata } from "./EditMetadata";

type Props = {
	entityType: EntityType;
	entityId: number;
};

const show = false;

export const EditEntity = async ({ entityType, entityId }: Props) => {
	const entity = await api.getEntity(entityType, entityId);
	const { id, name, location, description, images, metadata } = entity || {};

	// TODO: fetch path from next
	const currentPath = `/account/${entityType}/${entityId}/edit`;

	if (!entity || !id) {
		return "Oops, item not found";
	}

	return (
		<div>
			<section>
				<form action={updateEntity}>
					<input type="hidden" name="entityType" defaultValue={entityType} />
					<input type="hidden" name="entityId" defaultValue={id} />
					<input type="hidden" name="currentPath" defaultValue={currentPath} />

					<h1 className="mb-4">Edit: {name}</h1>

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
			</section>

			{show && (
				<EditImages entityId={id} images={images} currentPath={currentPath} />
			)}
			<EditMetadata
				entityType={entityType}
				entityId={id}
				metadata={metadata}
				currentPath={currentPath}
			/>
		</div>
	);
};
