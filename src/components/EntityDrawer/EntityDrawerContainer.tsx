"use client";

import type { ReactNode } from "react";
import { useEffect, useId } from "react";
import { useEntityDrawerContext } from "@/context";
import { EntityDrawer } from "./EntityDrawer";

type Props = {
	children: ReactNode;
};
export const EntityDrawerContainer = ({ children }: Props) => {
	const drawerInputId = useId();
	const { setDrawerInputId } = useEntityDrawerContext();

	useEffect(() => {
		setDrawerInputId(drawerInputId);
	}, [setDrawerInputId, drawerInputId]);

	return (
		<div className="drawer drawer-end">
			<input id={drawerInputId} type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">{children}</div>
			<div className="drawer-side">
				<label
					htmlFor={drawerInputId}
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="bg-base-200 min-h-full w-9/12 p-4">
					<EntityDrawer />
				</div>
			</div>
		</div>
	);
};
