"use client";

import { ScreenCapture } from "@/components/ScreenCapture";
import { metadata } from "@/components/TomTom";

export function Play() {
	const TomTom = metadata.component;
	const imageFileName = metadata.id;

	return (
		<div>
			<ScreenCapture imageFileName={imageFileName}>
				<TomTom />
			</ScreenCapture>
		</div>
	);
}
