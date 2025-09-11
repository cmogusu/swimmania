"use client";

import HeatMap from "./HeatMap";

export default function App() {
	return (
		<div>
			<HeatMap />
			<div className="container">
				<p className="lead">
					This map is loading and rendering{" "}
					<a href="https://clived.live/street-addresses.geojson">
						this GeoJson file
					</a>{" "}
					that is approximately 30MB in size and contains 106,037 records. The
					records show the locations of street lights in the city of Melbourne
					in Australia. <br /> You can view the data{" "}
					<a href="https://data.melbourne.vic.gov.au/explore/dataset/street-lights-with-emitted-lux-level-council-owned-lights-only/information/">
						{" "}
						here
					</a>
				</p>
			</div>
		</div>
	);
}
