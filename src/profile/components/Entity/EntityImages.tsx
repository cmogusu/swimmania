import Image from "next/image";
import type { ImageData } from "@/server";

type Props = {
	images: ImageData[] | undefined;
};

export const EntityImages = ({ images }: Props) => {
	if (!images?.length) {
		return null;
	}

	return (
		<section className="mb-4">
			<h2>Images</h2>
			<div>
				{images.map((image) => (
					<div key={image.id} className="mb-2 ml-2">
						<Image
							alt={image.alt}
							className="size-10 rounded-box"
							width={1000}
							height={667}
							src={image.src}
						/>
					</div>
				))}
			</div>
		</section>
	);
};
