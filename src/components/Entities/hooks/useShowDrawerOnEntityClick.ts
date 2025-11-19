import { useCallback } from "react";
import { useEntityDrawerContext, useSelectedEntityContext } from "@/context";

export const useShowDrawerOnEntityClick = (entityId: number) => {
	const { selectEntity } = useSelectedEntityContext();
	const { toggleDrawer } = useEntityDrawerContext();

	const handleButtonClick = useCallback(() => {
		selectEntity(entityId);
		toggleDrawer();
	}, [selectEntity, toggleDrawer, entityId]);

	return handleButtonClick;
};
