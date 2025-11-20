import { useEffect, useState } from "react";
import { useEntityVisibilityNotifierContext } from "@/context";

export const useNotifyOnVisible = (entityId: number) => {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const { setEntityIsVisibleCallback } = useEntityVisibilityNotifierContext();

	useEffect(() => {
		setEntityIsVisibleCallback(entityId, setIsVisible);
	}, [entityId, setEntityIsVisibleCallback]);

	return isVisible;
};
