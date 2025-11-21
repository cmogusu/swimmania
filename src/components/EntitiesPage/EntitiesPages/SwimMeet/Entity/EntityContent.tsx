import type { RefObject } from "react";
import type { EntityData } from "@/server/types";

type Props = {
	entity: EntityData;
	itemPosition: number;
	containerRef?: RefObject<HTMLElement | null>;
};

export const EntityContent = ({
	entity,
	itemPosition,
	containerRef,
}: Props) => {
	const { entityId, name, description, metadata } = entity;
	const { startDate, endDate } = metadata || {};

	return (
		// @ts-ignore
		<tr ref={containerRef}>
			<td>{itemPosition}</td>
			<td>{name}</td>
			<td>{description}</td>
			<td>{getDateString(startDate)}</td>
			<td>{getDateString(endDate)}</td>
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

function getDateString(date?: unknown) {
	return date ? (date as Date).toLocaleDateString() : "";
}
