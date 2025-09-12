import Image from "next/image";
import { DefaultImage } from "@/constants";
import { type ImageData, updateImage } from "@/server";

type EditImageProps = {
	entityId: number;
	image: ImageData;
};

export const ImageForm = ({ entityId, image }: EditImageProps) => {
	const {
		id,
		alt = DefaultImage.alt,
		src = DefaultImage.src,
		isDefault,
	} = image;

	return (
		<form action={updateImage}>
			<input type="hidden" name="entityId" value={entityId} />
			<input type="hidden" name="id" value={id} />

			<Image
				alt={alt}
				className="size-10 rounded-box mb-3"
				width={1000}
				height={667}
				src={src}
			/>

			<label className="floating-label mb-3">
				<span>Alt description</span>
				<textarea
					className="textarea textarea-sm mb-3"
					name="alt"
					defaultValue={alt}
				/>
			</label>

			<label className="floating-label mb-3">
				<span>filepath</span>
				<input
					className="input input-sm"
					type="text"
					placeholder="/path/to/file.jpg"
					name="filepath"
					defaultValue={src}
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
				Update
			</button>
		</form>
	);
};
