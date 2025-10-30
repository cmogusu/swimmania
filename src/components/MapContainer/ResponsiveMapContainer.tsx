"use client";

import { type ReactNode, useRef } from "react";
import { DimensionsContextProvider } from "@/context/mapDimensionsContext";
import { useGetDimensions } from "./useGetDimensions";

type Props = {
	children: ReactNode;
};

export function ResponsiveMapContainer({ children }: Props) {
	const divRef = useRef<HTMLDivElement>(null);
	const { width, height } = useGetDimensions(divRef);

	return (
		<div ref={divRef} className="w-full h-full">
			<DimensionsContextProvider width={width} height={height}>
				{children}
			</DimensionsContextProvider>
		</div>
	);
}
