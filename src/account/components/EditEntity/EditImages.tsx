import Image from "next/image";
import { updateImage } from "@/server/api";
import type { ImageData } from "@/server/types";
import { AddImage } from "./AddImage";
import { ImageForm } from "./ImageForm";

type EditImagesProps = {
	entityId: number;
	images: ImageData[] | undefined;
};

export const EditImages = ({ entityId, images }: EditImagesProps) => {
	const defaultImage = (images || []).find((i) => i.isDefault);
	const nonDefaultImage = (images || []).filter((i) => !i.isDefault);

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

			{!!nonDefaultImage?.length && (
				<div className="mb-4">
					<h4>Update</h4>
					{nonDefaultImage.map((image) => (
						<div key={image.id} className="mb-2 ml-2">
							<div className="border rounded-box mb-4 p-4">
								<ImageForm
									action={updateImage}
									entityId={entityId}
									image={image}
								/>
							</div>
						</div>
					))}
				</div>
			)}

			<AddImage entityId={entityId} />
		</section>
	);
};
