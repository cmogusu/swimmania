"use client";

import { EntityTypesValues } from "@/constants";
import "./style.css";
import { useEffect, useState } from "react";

export const TextSlider = () => {
	const [scrollIndex, setScrollIndex] = useState<number>(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setScrollIndex((prevIndex) => {
				if (prevIndex + 1 < EntityTypesValues.length) {
					console.log(prevIndex);
					return prevIndex + 1;
				} else {
					removeInterval();
					return 0;
				}
			});
		}, 2000);

		const removeInterval = () => {
			clearInterval(intervalId);
		};

		return removeInterval;
	}, []);

	const top = scrollIndex * -30;

	return (
		<div className="flex flex-col border text-slider-container overflow-hidden relative">
			<ul className="relative transition-top" style={{ top }}>
				{EntityTypesValues.map((v) => (
					<li key={`${v}`}>
						<a className="line-height-30" href={`/${v}`}>
							{v}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
