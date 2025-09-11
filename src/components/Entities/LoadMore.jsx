"use client";

import React, { useCallback, useEffect, useRef } from "react";

export const LoadMore = ({ loadMore }) => {
	const divRef = useLoadMoreOnVisible(loadMore);

	return (
		<div ref={divRef}>
			<button onClick={loadMore}>Load more</button>
		</div>
	);
};

const useLoadMoreOnVisible = (loadMore) => {
	const divRef = useRef();
	const onIntersect = useCallback(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					loadMore();
				}
			});
		},
		[loadMore],
	);

	useEffect(() => {
		const options = {
			rootMargin: "0px",
			threshold: 0.1,
		};

		const observer = new IntersectionObserver(onIntersect, options);
		observer.observe(divRef.current);

		return () => {
			observer.disconnect();
		};
	}, [onIntersect]);

	return divRef;
};
