"use client";

import { type ReactNode, useRef } from "react";
import { ImgHeightToWidthRatio } from "@/constants";
import { DimensionsContextProvider } from "./MapDimensionsContext";
import { useGetDimensions } from "./useGetDimensions";

type Props = {
	ratio?: number;
	children: ReactNode;
};

export function FixedMapContainer({
	children,
	ratio = ImgHeightToWidthRatio,
}: Props) {
	const divRef = useRef<HTMLDivElement>(null);
	const { width } = useGetDimensions(divRef);
	const height = Math.floor(width * ratio);

	return (
		<div ref={divRef} className="w-full">
			<DimensionsContextProvider width={width} height={height}>
				{children}
			</DimensionsContextProvider>
		</div>
	);
}
