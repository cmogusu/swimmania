import { MapItem } from "../MapItem";
import { MapBackground } from "../MapItem/MapBackground";
import { SearchInput } from "../Search/SearchInput";

export const Section1 = () => {
	return (
		<section className="relative shadow-sm mb-4">
			<SearchInput />
			{/* <MapBackground />
			<MapItem /> */}
		</section>
	);
};
