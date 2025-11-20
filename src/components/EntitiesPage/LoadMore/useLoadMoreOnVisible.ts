import { useCallback, useEffect, useRef } from "react";

export const useLoadMoreOnVisible = (loadNextPage: () => void) => {
	const divRef = useRef<HTMLDivElement>(null);

	const onIntersect = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadNextPage();
				}
			});
		},
		[loadNextPage],
	);

	useEffect(() => {
		const options = {
			rootMargin: "0px",
			threshold: 0.1,
		};

		const observer = new IntersectionObserver(onIntersect, options);
		if (divRef.current) observer.observe(divRef.current);

		return () => {
			observer.disconnect();
		};
	}, [onIntersect]);

	return divRef;
};
