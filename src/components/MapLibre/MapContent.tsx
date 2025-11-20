import type { RefObject } from "react";

type Props = {
	width?: number;
	height?: number;
	divRef?: RefObject<HTMLDivElement | null>;
};

export const MapContent = ({ width, height, divRef }: Props) => (
	<div
		className="bg-gray-100"
		style={{ width: `${width}px`, height: `${height}px` }}
		ref={divRef}
	/>
);
