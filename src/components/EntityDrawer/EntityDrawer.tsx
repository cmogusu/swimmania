"use client";

import type { PropsWithChildren } from "react";
import { EntityDrawerContainer } from "./EntityDrawerContainer";
import { EntityDrawerContent } from "./EntityDrawerContent";

export const EntityDrawer = ({ children }: PropsWithChildren) => (
	<EntityDrawerContainer>
		<EntityDrawerContent>{children}</EntityDrawerContent>
	</EntityDrawerContainer>
);
