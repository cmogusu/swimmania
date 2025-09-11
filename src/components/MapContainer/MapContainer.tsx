"use client";

import {
	type ReactNode,
	useCallback,
	useRef,
	useSyncExternalStore,
} from "react";
import { ImgHeightToWidthRatio } from "@/constants";
import "./style.css";

type Props = {
	children: ReactNode;
};

export function MapContainer({ children }: Props) {
	const divRef = useRef<HTMLDivElement>(null);
	const getWidth = useCallback(
		(): number =>
			divRef.current ? divRef.current.getBoundingClientRect().width : 0,
		[],
	);

	const subscribe = useCallback((callback: () => void) => {
		window.addEventListener("resize", callback);
		return () => {
			window.removeEventListener("resize", callback);
		};
	}, []);

	const width = useSyncExternalStore(subscribe, getWidth, getServerSnapshot);
	const height = Math.floor(width * ImgHeightToWidthRatio);

	return (
		<div ref={divRef} className="w-full">
			<div
				className="bg-gray-100 map-container w-full"
				style={{ height: `${height}px` }}
			>
				{!!width && children}
			</div>
		</div>
	);
}

const getServerSnapshot = () => 0;
