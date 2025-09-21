import Image from "next/image";
import { DefaultSiteImage } from "@/constants";
import type { EntityData } from "@/server";
import { EntityCardContainer } from "./EntityCardContainer";
import { SelectEntityButton } from "./SelectEntityButton";

type Props = {
	entity: EntityData;
};

export const EntityCard = ({ entity }: Props) => {
	const { id, name, description, location, defaultImage } = entity;
	const image = defaultImage || DefaultSiteImage;

	return (
		<EntityCardContainer entityId={id}>
			<div className="card card-side bg-base-100 shadow-sm mb-4">
				<figure>
					<Image alt={image.alt} width={1000} height={667} src={image.src} />
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						{name}- {id}
					</h2>
					<p className="text-xs">{location}</p>
					<p>{description}</p>
					<div className="card-actions justify-end">
						<SelectEntityButton entityId={id} />
					</div>
				</div>
			</div>
		</EntityCardContainer>
	);
};
