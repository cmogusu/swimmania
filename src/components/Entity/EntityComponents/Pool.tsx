import Image from "next/image";
import { RelatedEntities } from "@/components";
import { DefaultSiteImage } from "@/constants";
import { EntityContextProvider } from "@/context";
import { Images } from "../Images";
import type { EntityProps } from "./types";

const show = false;

export default function Pool({ entity, entityType }: EntityProps) {
	const {
		id: entityId,
		name,
		description,
		location,
		defaultImage,
		images,
	} = entity;
	const image = defaultImage || DefaultSiteImage;

	return (
		<EntityContextProvider entityId={entityId} entityType={entityType}>
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
				{location && <div className="text-5xl">{location}</div>}

				<p className="text-2xl">{description}</p>
			</section>

			{show && <RelatedEntities entityType={entityType} entityId={entityId} />}
			{show && <Images images={images} />}
		</EntityContextProvider>
	);
}
