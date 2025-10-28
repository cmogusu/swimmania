import { type RefObject, useCallback, useSyncExternalStore } from "react";

export const useGetDimensions = (divRef: RefObject<HTMLDivElement | null>) => {
	const getDimensions = useCallback(() => {
		const { width, height } = divRef?.current
			? divRef.current.getBoundingClientRect()
			: { width: 0, height: 0 };

		return { width, height };
	}, [divRef.current]);

	const subscribe = useCallback((callback: () => void) => {
		window.addEventListener("resize", callback);

		return () => {
			window.removeEventListener("resize", callback);
		};
	}, []);

	return useSyncExternalStore(subscribe, getDimensions, getServerSnapshot);
};

const getServerSnapshot = () => ({ width: 0, height: 0 });
