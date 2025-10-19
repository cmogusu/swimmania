import Image from "next/image";
import { DefaultSiteImage } from "@/constants";
import type { EntityData } from "@/server/types";

type Props = {
	entity: EntityData;
};

export const EntityCard = ({ entity }: Props) => {
	const { id, name, description, location, type, defaultImage } = entity;
	const image = defaultImage || DefaultSiteImage;

	return (
		<div className="card card-side bg-base-100 shadow-sm mb-4 grid-rows-2">
			<figure>
				<Image alt={image.alt} width={1000} height={667} src={image.src} />
			</figure>
			<div className="card-body">
				<a href={`/${type}/${id}`}>
					<h2 className="card-title">
						{name} - {id}
					</h2>
				</a>
				<p className="text-xs">{location}</p>
				<p>{description}</p>
			</div>
		</div>
	);
};
