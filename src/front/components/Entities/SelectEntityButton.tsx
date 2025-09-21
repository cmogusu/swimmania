"use client";

import { useCallback } from "react";
import { useSelectedEntityContext } from "@/front/context";

type Props = {
	entityId: number;
};

export const SelectEntityButton = ({ entityId }: Props) => {
	const { selectEntity } = useSelectedEntityContext();

	const handleClick = useCallback(() => {
		selectEntity(entityId);
	}, [selectEntity, entityId]);

	return (
		<button className="btn btn-primary" type="button" onClick={handleClick}>
			View
		</button>
	);
};
