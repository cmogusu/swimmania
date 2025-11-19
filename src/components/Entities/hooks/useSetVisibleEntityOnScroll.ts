import { useEffect, useRef } from "react";
import { useVisibleEntityIdsContext } from "@/context";

export const useSetVisibleEntityOnScroll = (entityId: number) => {
	const divRef = useRef<HTMLDivElement>(null);
	const { setEntityContainerElement } = useVisibleEntityIdsContext();

	useEffect(() => {
		if (divRef.current) {
			const unsubscribe = setEntityContainerElement(divRef.current, entityId);
			return unsubscribe;
		}
	}, [entityId, setEntityContainerElement]);

	return divRef;
};
