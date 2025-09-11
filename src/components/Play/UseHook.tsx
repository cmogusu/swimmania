"use client";

import { useModalRenderContext } from "@/context";
import { useEffect } from "react";

type Props = {
	component: string;
};

export function UseHook({ component }: Props) {
	const { setActiveMapId } = useModalRenderContext();

	useEffect(() => {
		setActiveMapId(component);
	}, [setActiveMapId, component]);

	return null;
}
