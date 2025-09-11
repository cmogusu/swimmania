"use client";

import { useModalRenderContext } from "@/context";
import { useCallback } from "react";

type Props = {
	id: string;
};

export function RenderMapButton({ id }: Props) {
	const { setActiveMapId } = useModalRenderContext();

	const handleClick = useCallback(() => {
		setActiveMapId(id);
	}, [id, setActiveMapId]);

	return (
		<button
			className="btn btn-sm btn-outline"
			onClick={handleClick}
			type="button"
		>
			Quick view
		</button>
	);
}
