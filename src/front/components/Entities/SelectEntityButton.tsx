"use client";

import { useCallback } from "react";
import {
	useEntityDrawerContext,
	useSelectedEntityContext,
} from "@/front/context";

type Props = {
	entityId: number;
};

export const SelectEntityButton = ({ entityId }: Props) => {
	const { selectEntity } = useSelectedEntityContext();
	const { toggleDrawer } = useEntityDrawerContext();

	const handleClick = useCallback(() => {
		selectEntity(entityId);
		toggleDrawer();
	}, [selectEntity, toggleDrawer, entityId]);

	return (
		<button className="btn btn-primary" type="button" onClick={handleClick}>
			View
		</button>
	);
};
