"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import {
	// useEntityScrollObserverContext,
} from "@/front/context";

export const MapItem = () => {
	// const { visibleEntityIdsRef } = useEntityScrollObserverContext();

	const handlePageScroll = useCallback(() => {
		// requestIdleCallback(() => {
		// 	console.log(visibleEntityIdsRef.current);
		// });
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handlePageScroll);
		return () => {
			window.removeEventListener("scroll", handlePageScroll);
		};
	}, [handlePageScroll]);

	return (
		<div>
			<Image
				className="w-full"
				src="/images/map-placeholder.jpeg"
				alt="MapGuru logo"
				height={20}
				width={70}
			/>
		</div>
	);
};
