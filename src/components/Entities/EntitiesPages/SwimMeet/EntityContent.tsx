import Image from "next/image";
import { DefaultSiteImage } from "@/constants";
import type { EntityData, RawMetadata } from "@/server/types";

type Props = {
	entity: EntityData;
	metadata?: RawMetadata;
	handleButtonClick?: () => void;
};

export function EntityContent({ entity, metadata }: Props) {
	const { entityId, name, description, defaultImage } = entity;
	const image = defaultImage || DefaultSiteImage;
	const startDate = getDateString(metadata, "meetDates.startDate");
	const endDate = getDateString(metadata, "meetDates.endDate");

	return (
		<li className="list-row">
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
					{startDate} - {endDate}
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
}

function getDateString(
	metadata: RawMetadata | undefined,
	metadataName: string,
) {
	const date = metadata?.[metadataName];
	return date ? (date as unknown as Date).toLocaleDateString() : "";
}
