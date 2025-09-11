import { Card } from "@/components/Card";
import type { MapMetadata } from "@/types";

const metadata: MapMetadata = {
	img: {
		src: "/img/default-mapguru-image.jpg",
		alt: "loading large volumes of data",
	},
	title: "Efficient rendering of large volumes of data",
	description:
		"Map that loads and effeciently renders approximately 30MB of data containing more than 100k records.",
	component: "heatmaps",
};

export const SuspencePlay = () => {
	return (
		<div>
			<Card {...metadata} />
		</div>
	);
};
