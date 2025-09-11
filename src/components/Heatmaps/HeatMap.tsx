"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ImgHeightToWidthRatio } from "@/constants";
import { useApiKeyContext } from "@/context";
import { renderMap } from "./renderMap";
import "./style.css";

function HeatMapLocal() {
	const [zoom, setZoom] = useState("");
	const { maptilerApiKey } = useApiKeyContext();
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (
			!divRef.current ||
			divRef.current.querySelector("canvas") ||
			!maptilerApiKey
		) {
			return;
		}

		renderMap(divRef.current, setZoom, maptilerApiKey);
	}, [maptilerApiKey]);

	return (
		<div className="map-container w-full h-full">
			<span className="zoom-level">Zoom: {zoom}</span>
			<div className="map w-full h-full" ref={divRef} />
		</div>
	);
}

export default function HeatMap() {
	const divRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);
	const height = Math.floor(width * ImgHeightToWidthRatio);

	useLayoutEffect(() => {
		const divWidth = divRef.current?.clientWidth;
		divWidth && setWidth(divWidth);
	}, []);

	return (
		<div ref={divRef} className="w-full ">
			<div
				className="bg-gray-200"
				style={{ width: `${width}px`, height: `${height}px` }}
			>
				<HeatMapLocal />
			</div>
		</div>
	);
}
