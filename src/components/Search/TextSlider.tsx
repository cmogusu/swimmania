"use client";

import { ManuEntityTypes } from "@/server/constants";
import "./style.css";
import { useEffect, useState } from "react";
import type { EntityType } from "@/server/types";
import { getPlural } from "@/server/utils";

export const TextSlider = () => {
	const [scrollIndex, setScrollIndex] = useState<number>(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setScrollIndex((prevIndex) => {
				if (prevIndex + 1 < ManuEntityTypes.length) {
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
				{ManuEntityTypes.map((entityType: EntityType) => (
					<li key={`${entityType}`}>
						<a className="line-height-30" href={`/${entityType}`}>
							{getPlural(entityType)}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};
