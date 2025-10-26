import Image from "next/image";
import type { ImageData } from "@/server/types";

type EditImageProps = {
	entityId: number;
	image: ImageData;
	action: (formData: FormData) => void;
};

export const ImageForm = ({ entityId, image, action }: EditImageProps) => {
	const { id, alt, src, isDefault } = image;

	return (
		<form action={action}>
			<input type="hidden" name="entityId" value={entityId} />
			<input type="hidden" name="id" value={id} />

			{src && (
				<Image
					alt={alt}
					className="size-10 rounded-box mb-3"
					width={1000}
					height={667}
					src={src}
				/>
			)}

			<label className="floating-label mb-3">
				<span>File path</span>
				<input
					className="input input-sm"
					type="text"
					placeholder="/path/to/file.jpg"
					name="filepath"
					defaultValue={src}
				/>
			</label>

			<label className="floating-label mb-3">
				<span>Alt description</span>
				<textarea
					className="textarea textarea-sm mb-3"
					name="alt"
					defaultValue={alt}
				/>
			</label>

			<fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 mb-3">
				<legend className="fieldset-legend">Set default</legend>
				<label className="label">
					<input
						type="checkbox"
						name="isDefault"
						className="toggle toggle-sm"
						defaultChecked={isDefault}
					/>
				</label>
			</fieldset>

			<button className="btn btn-sm" type="submit">
				{id > -1 ? "Update" : "Create"}
			</button>
		</form>
	);
};
