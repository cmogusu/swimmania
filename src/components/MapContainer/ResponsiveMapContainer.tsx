"use client";

import { type ReactNode, useRef } from "react";
import "./style.css";
import { useGetDimensions } from "./useGetDimensions";

type Props = {
	children: ReactNode;
};

export function ResponsiveMapContainer({ children }: Props) {
	const divRef = useRef<HTMLDivElement>(null);
	const { width, height } = useGetDimensions(divRef);

	return (
		<div ref={divRef} className="w-full h-full">
			<div
				className="bg-gray-100 map-container w-full"
				style={{ height: `${height}px` }}
			>
				{!!width && children}
			</div>
		</div>
	);
}
