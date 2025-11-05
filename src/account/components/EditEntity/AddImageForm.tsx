import { updateImage } from "@/server/api/apiActions";
import type { EntityType, ImageData } from "@/server/types";

type EditImageProps = {
	entityType: EntityType;
	entityId: number;
	image: ImageData;
};

export const AddImageForm = ({
	entityType,
	entityId,
	image,
}: EditImageProps) => {
	const { id, alt } = image;

	return (
		<form action={updateImage}>
			<input type="hidden" name="entityType" value={entityType} />
			<input type="hidden" name="entityId" value={entityId} />
			<input type="hidden" name="id" value={id} />

			<label className="mb-3">
				<span>Upload file</span>
				<br />
				<input
					className="input input-sm"
					type="file"
					name="image"
					accept="image/*"
				/>
			</label>
			<div className="mb-4" />

			<label className="floating-label mb-3">
				<span>Alt description</span>
				<textarea
					className="textarea textarea-sm mb-3"
					name="alt"
					defaultValue={alt}
				/>
			</label>

			<button className="btn btn-sm" type="submit">
				Create
			</button>
		</form>
	);
};
