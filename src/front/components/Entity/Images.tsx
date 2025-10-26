import Image from "next/image";
import type { ImageData } from "@/server/types";

type Props = {
	images: ImageData[] | undefined;
};

export const Images = ({ images }: Props) => {
	const nonDefaultImages = (images || []).filter((i) => !i.isDefault);

	if (!nonDefaultImages?.length) {
		return null;
	}

	return (
		<section className="mb-4">
			<h2>Images</h2>
			<hr className="w-50 mb-4" />
			<div>
				{nonDefaultImages.map((image) => (
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
