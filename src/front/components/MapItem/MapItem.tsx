"use client";

import { useEffect } from "react";
import { MultipleLocationsMap } from "@/components/MapLibre";
import {
	// useVisibleEntityIdsContext,
	useEntityLocationContext,
} from "@/front/context";

export const MapItem = () => {
	const { entityLocations } = useEntityLocationContext();
	// const { visibleEntityIdsRef } = useVisibleEntityIdsContext();

	useEffect(() => {
		console.log(entityLocations);
	}, [entityLocations]);

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
		<div>
			<MultipleLocationsMap locations={entityLocations} />
		</div>
	);
};
