import Image from "next/image";
import { getImages } from "@/server/api/apiActions";
import type { EntityType, ImageData } from "@/server/types";
import { AddImageForm } from "./AddImageForm";
import { EditImageForm } from "./EditImageForm";

type EditImagesProps = {
	entityId: number;
	entityType: EntityType;
};

export const EditImages = async ({ entityId, entityType }: EditImagesProps) => {
	const images = await getImages(entityId);
	const defaultImage = (images || []).find((i) => i.isDefault);
	const nonDefaultImages = (images || []).filter((i) => !i.isDefault);
	const newImage = createEmptyImage();

	if (!images) {
		return "No images found";
	}

	return (
		<section className="mb-4">
			<h2 className="mb-5 mt-10">Images</h2>

			{defaultImage && (
				<div className="border rounded-box mb-4 p-4">
					<h3>Main image</h3>
					<Image
						alt={defaultImage.alt}
						className="size-96 rounded-box mb-3"
						width={1000}
						height={667}
						src={defaultImage.src}
					/>
				</div>
			)}

			{!!nonDefaultImages?.length && (
				<div className="mb-4 bg-gray-100 p-4 pt-8 border rounded-b-sm">
					<h4 className="mb-3">Update existing image</h4>
					<div className="grid grid-cols-3 gap-4">
						{nonDefaultImages.map((image) => (
							<div
								key={image.id}
								className="border rounded-box mb-4 p-4 bg-white"
							>
								<EditImageForm
									entityType={entityType}
									entityId={entityId}
									image={image}
								/>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="mb-4">
				<div className="mb-4 bg-gray-100 p-4 pt-8 border rounded-b-sm">
					<h4 className="mb-3">Upoad new image</h4>
					<div className="border rounded-box mb-4 p-4 bg-white">
						<AddImageForm
							entityType={entityType}
							entityId={entityId}
							image={newImage}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

const createEmptyImage = (): ImageData => ({
	id: -1,
	alt: "",
	src: "",
	isDefault: true,
});
