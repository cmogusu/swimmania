"use client";

import type { PropsWithChildren, ReactNode } from "react";
import { useEntityDrawerContext } from "@/context";
import { EntityDrawerContent } from "./EntityDrawerContent";
import { RenderedEntity } from "./RenderedEntitiy";

type Props = PropsWithChildren & {
	drawerInputId: string;
	originalChildren: ReactNode;
};

export const EntityDrawerContainer = ({
	drawerInputId,
	originalChildren,
}: Props) => {
	const { closeDrawer, inputRef } = useEntityDrawerContext();

	return (
		<EntityDrawerContent
			drawerInputId={drawerInputId}
			drawerContent={<RenderedEntity />}
			inputRef={inputRef}
			closeDrawer={closeDrawer}
		>
			{originalChildren}
		</EntityDrawerContent>
	);
};
