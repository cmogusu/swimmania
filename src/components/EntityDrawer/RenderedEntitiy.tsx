import Image from "next/image";
import { DefaultSiteImage } from "@/constants";
import { useSelectedEntityContext } from "@/context";

export const RenderedEntity = () => {
	const { entity } = useSelectedEntityContext();

	if (!entity) {
		return null;
	}

	const { name, description, defaultImage } = entity || {};
	const image = defaultImage || DefaultSiteImage;

	return (
		<section className="mb-4">
			<h1>{name}</h1>
			<hr className="w-50 mb-4" />
			<div className="mb-4">
				<Image
					alt={image.alt}
					className="size-10 rounded-box"
					width={1000}
					height={667}
					src={image.src}
				/>
			</div>

			<p className="text-2xl">{description}</p>
		</section>
	);
};
