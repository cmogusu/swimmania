"use client";

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useMemo,
} from "react";

const MapDimensionsContext = createContext({
	width: 0,
	height: 0,
});

type Props = PropsWithChildren & {
	width: number;
	height: number;
};

export const DimensionsContextProvider = ({
	width,
	height,
	children,
}: Props) => {
	const context = useMemo(
		() => ({
			width,
			height,
		}),
		[width, height],
	);

	return (
		<MapDimensionsContext.Provider value={context}>
			{width && height ? children : null}
		</MapDimensionsContext.Provider>
	);
};

export const useMapDimesionsContext = () => useContext(MapDimensionsContext);
