import type { PropsWithChildren } from "react";
import type { EntityProps } from "../types";

type Props = PropsWithChildren & EntityProps;

export default function SwimMeet({ entity, children }: Props) {
	const { entityId, name, description, entityType } = entity;

	return (
		<div className="card card-side bg-base-100 shadow-sm mb-4 grid-rows-2">
			<div className="card-body">
				<a href={`/${entityType}/${entityId}`}>
					<h2 className="card-title">
						{name} - {entityId}
					</h2>
				</a>
				<p>{description}</p>
				{children}
			</div>
		</div>
	);
}
