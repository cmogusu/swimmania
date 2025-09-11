import Image from "next/image";
import { DefaultSiteImage } from "@/constants";
import { api, type EntityType } from "@/server";

import { EntityImages } from "./EntityImages";
import { EntityMetadata } from "./EntityMetadata";

type Props = {
	entityType: EntityType;
	entityId: number;
};

export const Entity = async ({ entityType, entityId }: Props) => {
	const entity = await api.getEntity(entityType, entityId);
	const { name, description, location, defaultImage, images, metadata } =
		entity || {};
	const image = defaultImage || DefaultSiteImage;

	if (!entity) {
		return "Sorry, item not found";
	}

	return (
		<div>
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

			<EntityImages defaultImage={defaultImage} images={images} />
			<EntityMetadata entityType={entityType} metadata={metadata} />
		</div>
	);
};
