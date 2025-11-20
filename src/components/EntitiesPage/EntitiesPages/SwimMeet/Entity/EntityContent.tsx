import type { RefObject } from "react";
import { Loading } from "@/components/Loading";
import type { EntityData, RawMetadata } from "@/server/types";

type Props = {
	entity: EntityData;
	itemPosition: number;
	containerRef?: RefObject<HTMLElement | null>;
	metadata?: RawMetadata;
	isMetadataLoading?: boolean;
};

export const EntityContent = ({
	entity,
	itemPosition,
	containerRef,
	metadata,
	isMetadataLoading,
}: Props) => {
	const { entityId, name, description } = entity;
	const startDate = getDateString(metadata, "meetDates.startDate");
	const endDate = getDateString(metadata, "meetDates.endDate");

	return (
		// @ts-ignore
		<tr ref={containerRef}>
			<td>{itemPosition}</td>
			<td>{name}</td>
			<td>{description}</td>
			<td>
				{startDate} {isMetadataLoading && <Loading />}
			</td>
			<td>
				{endDate} {isMetadataLoading && <Loading />}
			</td>
			<td>
				<a
					className="btn btn-square btn-ghost"
					href={`/swimEvent?swimMeetId=${entityId}`}
				>
					Swim events
				</a>
			</td>
			<td>
				<a
					className="btn btn-square btn-ghost"
					href={`/swimResult?swimResultId=${entityId}`}
				>
					Swim results
				</a>
			</td>
		</tr>
	);
};

function getDateString(
	metadata: RawMetadata | undefined,
	metadataName: string,
) {
	const date = metadata?.[metadataName];
	return date ? (date as unknown as Date).toLocaleDateString() : "";
}
