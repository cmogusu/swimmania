"use client";

import dynamic from "next/dynamic";

const MapWithContext = dynamic(() => import("./MapWithContext"), {
	ssr: false,
});

export default function App() {
	return <MapWithContext />;
}
