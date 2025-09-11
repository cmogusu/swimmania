import Image from "next/image";
import type { ImageData } from "@/server";
import { updateImage } from "@/server";

type EditImagesProps = {
	currentPath: string;
	entityId: number;
	images: ImageData[] | undefined;
};

export const EditImages = ({
	currentPath,
	entityId,
	images,
}: EditImagesProps) => {
	const defaultImage = (images || []).find((i) => i.isDefault);
	const nonDefaultImages = (images || []).filter((i) => !i.isDefault);

	return (
		<section className="mb-4">
			<h2>Images</h2>
			<div className="mb-4">
				<h3>Default image</h3>
				{defaultImage && (
					<EditImage
						entityId={entityId}
						image={defaultImage}
						currentPath={currentPath}
					/>
				)}
			</div>
			<div>
				<h4>Other images</h4>
				{nonDefaultImages.map((image) => (
					<div key={image.id} className="mb-2 ml-2">
						<EditImage
							entityId={entityId}
							image={image}
							currentPath={currentPath}
						/>
					</div>
				))}
			</div>
		</section>
	);
};

type EditImageProps = {
	currentPath: string;
	entityId: number;
	image: ImageData;
};

const EditImage = ({ currentPath, entityId, image }: EditImageProps) => {
	const { id, alt, src, isDefault } = image;

	return (
		<div className="border rounded-box mb-4 p-4">
			<form action={updateImage}>
				<input type="hidden" name="entityId" value={entityId} />
				<input type="hidden" name="id" value={id} />
				<input type="hidden" name="currentPath" value={currentPath} />

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
		</div>
	);
};
