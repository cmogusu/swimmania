"use client";

// import { useEffect } from "react";
// import { MultipleLocationsMap } from "@/components/MapLibre";
import {
	// useVisibleEntityIdsContext,
	useEntityLocationContext,
} from "@/context";

import { ResponsiveMapContainer } from "../MapContainer";

export const EntitiesMap = () => {
	const { entityLocations } = useEntityLocationContext();
	// const { visibleEntityIdsRef } = useVisibleEntityIdsContext();

	// useEffect(() => {
	// 	console.log(entityLocations);
	// }, [entityLocations]);

	// const handlePageScroll = useCallback(() => {
	// 	requestIdleCallback(() => {
	// 		console.log(visibleEntityIdsRef.current);
	// 	});
	// }, []);

	// useEffect(() => {
	// 	window.addEventListener("scroll", handlePageScroll);
	// 	return () => {
	// 		window.removeEventListener("scroll", handlePageScroll);
	// 	};
	// }, [handlePageScroll]);

	if (!entityLocations.length) {
		return null;
	}

	return (
		<div className="sticky top-0">
			<div className="h-dvh bg-amber-500">
				<ResponsiveMapContainer>
					<div className="w-full h-full bg-pink-400">hello world</div>
				</ResponsiveMapContainer>
			</div>
		</div>
	);
};
