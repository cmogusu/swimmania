"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { useVisibleEntityIdsContext } from "@/context";

type Props = {
	children: ReactNode;
	entityId: number;
};

export const EntityContainer = ({ entityId, children }: Props) => {
	const divRef = useRef<HTMLDivElement>(null);
	const { setEntityContainerElement } = useVisibleEntityIdsContext();

	useEffect(() => {
		if (divRef.current) {
			const unsubscribe = setEntityContainerElement(divRef.current, entityId);
			return unsubscribe;
		}
	}, [entityId, setEntityContainerElement]);

	return <div ref={divRef}>{children}</div>;
};
