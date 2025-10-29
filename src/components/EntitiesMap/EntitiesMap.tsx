"use client";

import { useEffect } from "react";
import { MultipleLocationsMap } from "@/components/MapLibre";
import {
	useEntityLocationContext,
	useVisibleEntityIdsContext,
} from "@/context";

export const EntitiesMap = () => {
	const { entityLocations } = useEntityLocationContext();
	const { visibleEntityIds } = useVisibleEntityIdsContext();

	useEffect(() => {
		console.log(visibleEntityIds);
	}, [visibleEntityIds]);

	return (
		<div className="sticky top-0">
			<div className="h-dvh bg-amber-500">
				<MultipleLocationsMap locations={entityLocations} />
			</div>
		</div>
	);
};
