"use client";

import type { PropsWithChildren } from "react";
import { EntityDrawerContainer } from "./EntityDrawerContainer";
import { EntityDrawerContent } from "./EntityDrawerContent";

export const EntityDrawer = ({ children }: PropsWithChildren) => {
	const drawerInputId = "drawer_input_id";
	return (
		<EntityDrawerContainer
			drawerInputId={drawerInputId}
			originalChildren={children}
		>
			<EntityDrawerContent drawerInputId={drawerInputId}>
				{children}
			</EntityDrawerContent>
		</EntityDrawerContainer>
	);
};
