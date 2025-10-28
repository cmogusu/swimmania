import { type RefObject, useCallback, useSyncExternalStore } from "react";
import { throttle } from "@/utilities/general";

let dimensionsStore = {
	width: 0,
	height: 0,
};

export const useGetDimensions = (divRef: RefObject<HTMLDivElement | null>) => {
	const getDimensions = useCallback(() => {
		if (divRef?.current) {
			const { width, height } = divRef.current.getBoundingClientRect();
			if (
				!isEqual(width, dimensionsStore.width) ||
				!isEqual(height, dimensionsStore.height)
			) {
				dimensionsStore = {
					width,
					height,
				};
			}
		}

		return dimensionsStore;
	}, [divRef.current]);

	const subscribe = useCallback((callback: () => void) => {
		const throttledCallback = throttle(callback, 100);
		window.addEventListener("resize", throttledCallback);

		return () => {
			window.removeEventListener("resize", throttledCallback);
		};
	}, []);

	return useSyncExternalStore(subscribe, getDimensions, getServerSnapshot);
};

const getServerSnapshot = () => dimensionsStore;

const isEqual = (v1: number, v2: number) => v1 === v2;
