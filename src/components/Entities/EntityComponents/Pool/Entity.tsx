import Image from "next/image";
import type { PropsWithChildren } from "react";
import { DefaultSiteImage } from "@/constants";
import { SelectEntityButton } from "../../SelectEntityButton";
import type { EntityProps } from "../types";

type Props = PropsWithChildren & EntityProps;

export default function Pool({ entity, children }: Props) {
	const { id, name, description, type, defaultImage } = entity;
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
				<p>{description}</p>
				<div className="card-actions justify-end">
					<SelectEntityButton entityId={id} />
				</div>

				{children}
			</div>
		</div>
	);
}
