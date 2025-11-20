import { useEffect, useRef } from "react";
import { useVisibleEntityIdsContext } from "@/context";

export const useSetVisibleEntityOnScroll = (entityId: number) => {
	const containerRef = useRef<HTMLElement>(null);
	const { setEntityContainerElement } = useVisibleEntityIdsContext();

	useEffect(() => {
		if (containerRef.current) {
			const unsubscribe = setEntityContainerElement(
				entityId,
				containerRef.current,
			);
			return unsubscribe;
		}
	}, [entityId, setEntityContainerElement]);

	return containerRef;
};
