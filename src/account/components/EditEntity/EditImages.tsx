import Image from "next/image";
import { DefaultImage } from "@/constants";
import type { ImageData } from "@/server";
import { ImageForm } from "../Forms";

type EditImagesProps = {
	entityId: number;
	images: ImageData[] | undefined;
};

export const EditImages = ({ entityId, images }: EditImagesProps) => {
	const defaultImage = (images || []).find((i) => i.isDefault);
	const { alt, src } = defaultImage || DefaultImage;

	return (
		<section className="mb-4">
			<h2>Images</h2>
			<div className="mb-4">
				<h3>Default image</h3>
				{defaultImage && (
					<div className="border rounded-box mb-4 p-4">
						<Image
							alt={alt}
							className="size-10 rounded-box mb-3"
							width={1000}
							height={667}
							src={src}
						/>
					</div>
				)}
			</div>
			<div>
				<h4>Other images</h4>
				{(images || []).map((image) => (
					<div key={image.id} className="mb-2 ml-2">
						<div className="border rounded-box mb-4 p-4">
							<ImageForm entityId={entityId} image={image} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
