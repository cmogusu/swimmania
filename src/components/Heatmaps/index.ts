import dynamic from "next/dynamic";
import type { MapMetadata } from "@/types";

export * from "./App";

const metadata = {
	id: "heatmaps",
	img: {
		src: "/img/default-mapguru-image.jpg",
		alt: "loading large volumes of data",
	},
	title: "Efficient rendering of large volumes of data",
	description:
		"Map that loads and effeciently renders approximately 30MB of data containing more than 100k records.",
	categories: ["maplibre", "massiveData", "clusters", "heatmap", "dog"],
};

export const heatmapMetadata: MapMetadata[] = [
	{
		url: "./App",
	},
].map(({ url }) => ({
	...metadata,
	component: dynamic(() => import(url)),
}));
// export const heatmapMetadata: MapMetadata[] = [metadata];

export const heatcow = "moo";
