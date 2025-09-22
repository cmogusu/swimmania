"use client";

import {
	useEntityDrawerContext,
	useSelectedEntityContext,
} from "@/front/context";

export const EntityDrawer = () => {
	const { entity } = useSelectedEntityContext();
	const { toggleDrawer } = useEntityDrawerContext();

	if (!entity) {
		return null;
	}

	return (
		<div className="">
			<h1>{entity.name}</h1>
			<p className="text-xs">{entity.location}</p>
			<p>{entity.description} horse</p>
			<button
				type="button"
				onClick={toggleDrawer}
				className="drawer-button btn btn-primary"
			>
				Close drawer
			</button>
		</div>
	);
};
