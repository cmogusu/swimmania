import { MapItem } from "../MapItem";
import { EntityCardList } from "./EntityCardList";

export const Section2 = () => (
	<section className="md:container mx-auto grid grid-cols-2 gap-4 w-full">
		<div className="col-start-1 col-end-2 ">
			<div>
				<h1>Coaches</h1>
				<EntityCardList />
			</div>
		</div>
		<div className="col-start-2 col-end-3 relative">
			<div className="sticky top-4">
				<MapItem />
			</div>
		</div>
	</section>
);
