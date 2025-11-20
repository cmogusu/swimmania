"use client";
import { useSelectedEntityContext } from "@/context";
import type { EntityData } from "@/server/types";
import { EntityDrawer } from "../EntityDrawer";

type Props = {
	entities: EntityData[];
};

export const Drawer = ({ entities }: Props) => {
	return (
		<EntityDrawer>
			<InnerDrawer entities={entities} />
			<div>hello</div>
		</EntityDrawer>
	);
};

const InnerDrawer = ({ entities }: Props) => {
	const { selectEntity } = useSelectedEntityContext();

	return (
		<section>
			{entities.map((e) => (
				<div
					key={e.entityId}
					className="border border-lime-300 border-r-2 mb-3"
				>
					<h2>{e.name}</h2>
					<button
						type="button"
						className="btn btn-sm btn-primary"
						onClick={() => selectEntity(e.entityId)}
					>
						click
					</button>
				</div>
			))}
		</section>
	);
};
