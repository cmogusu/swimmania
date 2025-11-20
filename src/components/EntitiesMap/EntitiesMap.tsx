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

	return <MultipleLocationsMap locations={entityLocations} />;
};
