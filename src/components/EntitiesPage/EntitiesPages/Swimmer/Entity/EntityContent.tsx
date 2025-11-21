import Image from "next/image";
import type { RefObject } from "react";
import { DefaultSiteImage } from "@/constants";
import type { EntityData } from "@/server/types";

type Props = {
	entity: EntityData;
	containerRef?: RefObject<HTMLElement | null>;
};

export const EntityContent = ({ entity, containerRef }: Props) => {
	const { entityId, name, description, defaultImage, metadata = {} } = entity;
	const image = defaultImage || DefaultSiteImage;
	const { startDate, endDate } = metadata;

	return (
		// @ts-ignore
		<li ref={containerRef} className="list-row">
			<div>
				<Image
					className="size-10 rounded-box"
					alt={image.alt}
					width={1000}
					height={667}
					src={image.src}
				/>
			</div>
			<div>
				<div>{name}</div>
				<div className="text-xs uppercase font-semibold opacity-60">
					{getDateString(startDate)} - {getDateString(endDate)}
				</div>
			</div>
			<p className="list-col-wrap text-xs">{description}</p>
			<a
				className="btn btn-square btn-ghost"
				href={`/swimEvent?swimMeetId=${entityId}`}
			>
				view swim events
			</a>
			<a
				className="btn btn-square btn-ghost"
				href={`/swimResult?swimResultId=${entityId}`}
			>
				view swim results
			</a>
		</li>
	);
};

function getDateString(date?: unknown) {
	return date ? (date as Date).toLocaleDateString() : "";
}
