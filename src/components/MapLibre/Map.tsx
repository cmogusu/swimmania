"use client";

import { MapLibreMap } from "@mapcomponents/react-maplibre";
import { ThreeJsLayer } from "./MLThreeJsLayer";

export function MapWithAnimation() {
	const mapId = "mapId";

	return (
		<div>
			<MapLibreMap
				mapId={mapId}
				options={{
					style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
					center: [7.099771581806502, 45.73395746209983],
					pitch: 45,
					zoom: 10,
				}}
				style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
			/>
			<ThreeJsLayer
				mapId={mapId}
				init={() => console.log("init")}
				onDone={() => console.log("done")}
			/>
		</div>
	);
}
