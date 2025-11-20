"use client";

import { type PropsWithChildren, useEffect, useId } from "react";
import { useEntityDrawerContext, useSelectedEntityContext } from "@/context";
import { EntityDrawerContent } from "./EntityDrawerContent";
import { RenderedEntity } from "./RenderedEntitiy";

export const EntityDrawerContainer = ({ children }: PropsWithChildren) => {
	const drawerInputId = useId();
	const { toggleDrawer, inputRef } = useEntityDrawerContext();
	const { entity } = useSelectedEntityContext();

	useEffect(() => {
		if (toggleDrawer && entity) {
			toggleDrawer();
		}
	}, [entity, toggleDrawer]);

	return (
		<EntityDrawerContent
			drawerInputId={drawerInputId}
			drawerContent={<RenderedEntity entity={entity} />}
			inputRef={inputRef}
			toggleDrawer={toggleDrawer}
		>
			{children}
		</EntityDrawerContent>
	);
};
