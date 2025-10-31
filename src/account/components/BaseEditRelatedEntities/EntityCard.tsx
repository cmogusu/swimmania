import Image from "next/image";
import type { PropsWithChildren } from "react";
import { DefaultSiteImage } from "@/constants";
import type { EntityData } from "@/server/types";

type Props = PropsWithChildren & {
	entity: EntityData;
};

export const EntityCard = ({ children, entity }: Props) => {
	const { id, name, type, defaultImage } = entity || {};
	const image = defaultImage || DefaultSiteImage;

	return (
		<div className="card bg-base-100 shadow-sm mb-4 grid-rows-2">
			<figure>
				<Image alt={image.alt} width={1000} height={667} src={image.src} />
			</figure>
			<div className="card-body">
				<a href={`/${type}/${id}`}>
					<h4 className="card-title">{name}</h4>
				</a>
				<div className="card-actions justify-end">{children}</div>
			</div>
		</div>
	);
};
